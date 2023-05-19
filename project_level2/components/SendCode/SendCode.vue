<template>
	<view class="code-container">
		<view class="vCode-btn" @click="getForm">
			{{runTime?`${time}后重新获取 `:'获取验证码'}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "SendCode",
		data() {
			return {
				timerId: null,
				time: 60,
				runTime: false
			};
		},
		beforeDestroy() {
			if (this.timerId) {
				clearInterval(this.timerId)
				this.timerId = null
			}
		},
		methods: {
			getForm() {
				if (this.runTime) {
					return
				}
				this.$emit('getForm', this._sendCode)
			},
			async _sendCode(form) {
				// 获取form表单
				const {
					phone
				} = await form.validateField('phone')
				// 定时器的创建和初始化
				this.runTime = true
				this.time = 60
				this.timerRunning()
				// 发送请求
				const resp = await this.$http.get_code(phone)
			},
			timerRunning() {
				this.timerId = setInterval(() => {
					if (this.time === 1) {
						clearInterval(this.timerId)
						this.timerId = null
						this.runTime = false
						this.time = 60
						return
					}
					this.time--
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.code-container {
		flex-shrink: 0;
		margin-right: 20rpx;

		.vCode-btn {
			background-color: $base-color;
			color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			opacity: .8;
		}
	}
</style>
