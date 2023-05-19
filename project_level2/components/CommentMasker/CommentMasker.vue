<template>
	<view>
		<uni-popup ref="popup" :mask-click="true" type="bottom">
			<view class="popup-wrapper">
				<view class="popup-header">
					<view class="popup-header-item" @click="$emit('closePopup')">
						取消
					</view>
					<view class="popup-header-item" @click="sendCommentData">
						发布
					</view>
				</view>
				<view class="popup-content">
					<textarea class="popup-content-area" v-model.trim="commentsVal" placeholder="请输入评论内容"
						maxlength="200"></textarea>
					<view class="popup-content-count">
						{{commentsVal.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "CommentMasker",
		data() {
			return {
				commentsVal: ''
			};
		},
		props: {
			showPopup: {
				default: false,
				type: Boolean
			}
		},
		watch: {
			showPopup: {
				handler(val) {
					val ? this.$refs.popup.open() : this.$refs.popup.close()
				}
			}
		},
		methods: {
			sendCommentData() {
				if (!this.commentsVal) {
					uni.showToast({
						title: '请输入评论内容！',
						icon: 'none'
					})
					return
				}
				this.$emit('sendCommentData', this.commentsVal)
				this.commentsVal = ''
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrapper {
		background-color: #fff;

		.popup-header {
			@include flex();
			font-size: 28rpx;
			color: #666;
			border-bottom: 1px solid #f5f5f5;

			.popup-header-item {
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 30rpx;
			}

		}

		.popup-content {
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;

			.popup-content-area {
				height: 400rpx;
				width: 100%;
			}

			.popup-content-count {
				@include flex(flex-end);
				font-size: 24rpx;
				color: $c-9;
			}
		}

	}
</style>