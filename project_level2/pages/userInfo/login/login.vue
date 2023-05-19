<template>
	<view class="login-container">
		<view class="banner-img">
			<image src="../../../static/img/login_bg.png" mode=""></image>
		</view>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" @click="changeLoginType('account')" :class="{'active':type==='account'}">
				账号登录
			</view>
			<!-- 			<view class="nav-item" @click="changeLoginType('mobile')" :class="{'active':type!=='account'}">
				手机登录
			</view> -->
		</view>
		<!-- 表单部分 -->
		<uni-forms class="form" ref="form" :modelValue="formData">
			<view class="" v-if="type==='account'">
				<uni-forms-item label="账号" name="loginName">
					<uni-easyinput :inputBorder="false" type="text" v-model="formData.loginName"
						placeholder-class="placeholder" class="form-input" placeholder="请输入账号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput :inputBorder="false" type="password" v-model="formData.password"
						placeholder-class="placeholder" class="form-input" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
			</view>
			<view class="" v-else>
				<uni-forms-item label="手机号" name="phone">
					<uni-easyinput :inputBorder="false" type="number" v-model="formData.phone"
						placeholder-class="placeholder" class="form-input" placeholder="请输入手机号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<uni-easyinput :inputBorder="false" type="text" v-model="formData.vCode"
						placeholder-class="placeholder" class="form-input" placeholder="请输入验证码"></uni-easyinput>
					<SendCode @getForm='getForm'></SendCode>
				</uni-forms-item>
			</view>
			<button type="default" class="login-btn" @click="_userLoginSubmit">立即登录</button>
		</uni-forms>
		<view class="footer-select-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				formData: {
					loginName: '',
					password: '',
					phone: '',
					vCode: ''
				},
				type: 'account'
			}
		},
		onReady() {
			this.$refs.form.setRules(this.userRules)
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			async _userLoginSubmit() {
				this.$refs.form.validate().then(res => {
					this._sendUserInfo({
						...res,
						type: this.type
					})
				})
			},
			changeLoginType(type) {
				this.type = type
				this.$refs.form.clearValidate()
			},
			async _sendUserInfo(userinfo) {
				const resp = await this.$http.user_login(userinfo)
				if (resp) {
					uni.showToast({
						title: '用户登录成功！',
						icon: 'none'
					})
					this.updateUserInfo(resp.data)
					setTimeout(() => {
						// #ifdef H5
						uni.switchTab({
							url: '/pages/index/index'
						})
						// #endif
						// #ifndef H5
						uni.navigateBack()
						// #endif
					}, 1500)
				}
			},
			getForm(callback) {
				if (callback) {
					callback(this.$refs.form)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './css/login.scss';
</style>
<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}
</style>