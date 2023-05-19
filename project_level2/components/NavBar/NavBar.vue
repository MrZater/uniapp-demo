<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<view :style="{height:statusBarHeight+'rpx'}"></view>
			<!-- 当组件应用在搜索界面的时候添加一个回退按钮 -->
			<view @click="ruturnArticleList" v-if="isSearch" class="return-icon" :style="{top:statusBarHeight+'rpx'}">
				<uni-icons type="back" size="22" color="#fff" />
			</view>
			<view @click="goSearchPage" class="nav-bar-content"
				:style="{marginRight:marginRight+'rpx',marginLeft:!isSearch?0:'20rpx'}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="nav-bar-search-txt" v-if="!isSearch">
					输入文章进行搜索
				</view>
				<input v-model.trim="searchVal" confirm-type="search" @confirm="changeInput" type="text" v-else
					class="search-input" placeholder="输入文章进行搜索">
			</view>
		</view>
		<!-- 垫片 -->
		<view :style="{height:statusBarHeight+ 80+'rpx'}">

		</view>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		data() {
			return {
				statusBarHeight: 20,
				marginRight: 0
			};
		},
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			parentVal: {
				type: String,
				default: ''
			}
		},
		computed: {
			searchVal: {
				get() {
					return this.parentVal
				},
				set(val) {
					this.$emit('updateVal', val)
					if(!val){
						this.$emit('sendSearchData',val)
					}
				}
			}
		},
		created() {
			this.SystemInfo()
		},
		methods: {
			SystemInfo() {
				const systemInfo = uni.getSystemInfoSync()
				systemInfo.statusBarHeight && (this.statusBarHeight = systemInfo.statusBarHeight * 2)
				// #ifdef MP-WEIXIN
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				this.statusBarHeight = menuButtonInfo.top * 2
				this.marginRight = menuButtonInfo.width * 2
				// #endif
			},
			// 跳转至搜索界面
			goSearchPage() {
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			ruturnArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '/pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			changeInput(e) {
				this.$emit('sendSearchData', e)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/NavBar.scss';
</style>