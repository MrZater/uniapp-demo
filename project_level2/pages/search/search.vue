<template>
	<view class="search-container">
		<!-- 搜索导航组件 -->
		<NavBar :isSearch="isSearch" :parentVal='parentVal' @updateVal='parentVal=$event'
			@sendSearchData='_sendSearchData'></NavBar>
		<!-- 搜索容器 -->
		<view v-if="isShowHistory" class="search-wrapper">
			<!-- 没有进行搜索操作 -->
			<view class="search-history-container">
				<!-- 头部内容 -->
				<view class="search-header">
					<text class="history-text">搜索历史</text>
					<text class="history-clear" @click="claenHistory">清空</text>
				</view>
				<!-- 内容 -->
				<view v-if="historyList.length" class="search-history-content">
					<view @click="openHistory(item)" class="history-content-item" v-for="(item,index) in historyList" :key='index'>
						{{item}}
					</view>
				</view>
				<!-- 没有内容 -->
				<view v-else class="no-data">
					当前没有搜索历史
				</view>
			</view>
		</view>
		<view v-else class="search-list-container">
			<!-- 有内容 -->
			<ListItem v-if="searchList.length" @saveSearchHistory='saveSearchHistory' :isShowLoadMore='false' :articleList='searchList'></ListItem>
			<!-- 没有内容 -->
			<view v-else class="no-data">
				没有搜索到相关数据
			</view>
		</view>

	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				isSearch: true,
				parentVal: '',
				searchList: [],
				isShowHistory: true
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			// 获取数据
			async _sendSearchData() {
				this.isShowHistory = false
				// 搜索为空
				if (!this.parentVal) {
					this.isShowHistory = true
					this.searchList = []
					return
				}
				const res = await this.$http.get_search_data({
					searchVal: this.parentVal
				})
				const {
					articleList
				} = res.data
				this.searchList = articleList
			},
			// 保存搜索历史
			saveSearchHistory(){
				this.setHistory(this.parentVal)
			},
			...mapMutations(['setHistory', 'claenHistory']),
			// 点击搜索历史记录进行搜索
			openHistory(val){
				this.parentVal = val
				this._sendSearchData()
			}
		}
	}
</script>

<style lang="scss">
	@import './css/search.scss';
</style>