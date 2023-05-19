<template>
	<view class="list-scroll-container">
		<scroll-view scroll-y="true" class="list-scroll" lower-threshold='200' @scrolltolower="loadMore">
			<view>
				<ListCard @saveSearchHistory='$emit("saveSearchHistor")' v-for="(item,index) in articleList" :key="index" :item='item'></ListCard>
			</view>
			<uni-load-more v-if="isShowLoadMore"
				:status="loadData.loading||'loading'" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ListItem",
		data() {
			return {};
		},
		props: {
			articleList: {
				type: Array
			},

			loadData: {
				type: Object,
				default: () => ({
					loading: 'loading'
				})
			},
			isShowLoadMore: {
				default: true,
				type: Boolean
			}
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>