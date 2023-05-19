<template>
	<view class="tab-bar">
		<!-- 滚动区域 -->
		<scroll-view :scroll-with-animation="true" :scroll-into-view="currentIndex" scroll-x="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view :id="`item${index}`" @click="changeActiveIndex(index)" :class="{active:activeIndex===index}"
					class="tab-scroll-item" v-for="(item,index) in labelList " :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标部分 -->
		<view class="tab-icon" @click="goLabelAdmin">
			<uni-icons type='gear' size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		data() {
			return {
				currentIndex: `item0`
			};
		},
		props: {
			labelList: {
				type: Array,
			},
			activeIndex: {
				type: Number
			}
		},
		watch: {

			activeIndex: {
				handler(val) {
					this.currentIndex = `item${val}`
				}
			}
		},
		methods: {
			changeActiveIndex(index) {
				this.$emit('changeActiveIndex', index)
			},
			async goLabelAdmin() {
				await this.checkedIsLogin()
				uni.navigateTo({
					url: '/pages/labelAdmin/labelAdmin'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './css/TabBar.scss';
</style>