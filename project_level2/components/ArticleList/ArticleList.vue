<template>
	<swiper class="swiper-container" :current="activeIndex" @change="changeActiveIndex">
		<swiper-item v-for="(item,index) in labelList" :key="item._id">
			<view class="swiper-item">
				<ListItem :loadData='pageData[index]' :articleList='articleData[index]' @loadMore='loadMoreData' />
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "ArticleList",
		data() {
			return {
				articleData: {},
				pageData: {},
				pageSize: 6
			};
		},
		props: {
			labelList: {
				type: Array
			},
			activeIndex: {
				type: Number
			}
		},
		created() {
			this.labelList.length && this._getArticleList(this.activeIndex)
		},
		watch: {
			labelList: {
				handler(val) {
					this.articleData = {}
					this.pageData = {}
					if (val.length > 0) {
						this._getArticleList(this.activeIndex)
					}
				}
			}
		},
		methods: {
			loadMoreData() {
				if (this.pageData[this.activeIndex].total > this.articleData[this.activeIndex].length) {
					this.pageData[this.activeIndex].page++
					this._getArticleList(this.activeIndex)
				}
			},
			changeActiveIndex(e) {
				this.articleList = []
				this.$emit('changeActiveIndex', e.detail.current)
				if (!this.articleData[e.detail.current]) {
					this._getArticleList(e.detail.current)
				}
			},
			// 进行数据的请求获取
			async _getArticleList(idx) {
				if (!this.pageData[idx]) {
					this.$set(this.pageData, idx, {
						page: 1,
						total: 0,
						loading: 'loading'
					})
				}
				const res = await this.$http.get_article_list({
					classify: this.labelList[idx].name,
					page: this.pageData[idx].page,
					pageSize: this.pageSize
				})
				let oldList = this.articleData[idx] || []
				this.$set(this.articleData, idx, [...oldList, ...res.data.articleList])
				this.pageData[idx].total = res.data.total
				if (this.pageData[idx].total === this.articleData[idx].length) {
					this.pageData[idx].loading = 'noMore'
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: auto;
		}
	}
</style>