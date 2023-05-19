<template>
	<view>
		<!-- 基础模式 -->
		<view class="list-card" v-if="item.mode==='base'" @click="goArticleDetail">
			<view class="list-card-img">
				<image :src="item.cover[0]?item.cover[0]:'/static/img/logo.jpeg'" mode=""></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<SaveLikes :_id='item._id'></SaveLikes>
				</view>
				<view class="list-card-content-desc">
					<view class="article-type">
						{{item.classify}}
					</view>
					<view class="browse-number">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode==='column'" @click="goArticleDetail">
			<view class="list-card-top">
				<text>{{item.title}}</text>
				<SaveLikes :_id='item._id'></SaveLikes>
			</view>
			<view class="list-card-middle">
				<view class="image-container" v-for="(item,index) in item.cover.slice(0,3)" :key="index">
					<image :src="item?item:'/static/img/logo.jpeg'" mode=""></image>
				</view>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card mode-image" v-if="item.mode==='image'" @click="goArticleDetail">
			<view class="list-card-top">
				<view class="image-container">
					<image :src="item.cover[0]?item.cover[0]:'/static/img/logo.jpeg'" mode=""></image>
				</view>
			</view>
			<view class="list-card-middle">
				<text>{{item.title}}</text>
				<SaveLikes :_id='item._id'></SaveLikes>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ListCard",
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			goArticleDetail() {
				const {title,_id,author,create_time,thumbs_up_count,browse_count} = this.item
				const params = JSON.stringify({title,_id,author,create_time,thumbs_up_count,browse_count})
				this.$emit('saveSearchHistory')
				uni.navigateTo({
					url:'/pages/articleDetail/articleDetail'+`?params=${params}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './css/ListCard.scss';
</style>
