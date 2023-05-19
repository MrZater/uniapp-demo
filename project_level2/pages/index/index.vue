<template>
	<view class="home-container">
		<NavBar />
		<TabBar :labelList='labelList' :activeIndex='activeIndex' @changeActiveIndex='changeActiveIndex' />
		<ArticleList :labelList='labelList' :activeIndex='activeIndex' @changeActiveIndex='changeActiveIndex'
			class="list-container"></ArticleList>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				activeIndex: 0
			}
		},
		onLoad() {
			this._initLabelList()
		},
		computed: {
			labelList() {
				if (this.userInfo) {
					const list = [...this.$store.state.labelList.slice(0, 1), ...this.$store.state.labelList.filter(item =>
						this
						.userInfo.label_ids.includes(item._id))]
					this.activeIndex = 0
					return list
				} else {
					return this.$store.state.labelList
				}
			}
		},
		methods: {
			...mapMutations(['setLabelList']),
			async _initLabelList() {
				if (this.labelList.length) return
				const res = await this.$http.get_label_list()
				this.setLabelList([{
					name: '全部'
				}, ...res.data])
			},
			changeActiveIndex(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
		position: relative;
	}

	.home-container {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}

	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>