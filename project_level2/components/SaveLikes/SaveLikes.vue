<template>
	<view class="save-icons" @click.stop="_changeSaveStatus">
		<uni-icons :type='isSave?"heart-filled":"heart"' size="18" color="#ff6600"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "SaveLikes",
		data() {
			return {

			};
		},
		props: {
			_id: {
				type: String,
				default:''
			}
		},

		computed: {
			isSave() {
				if (this.userInfo && this.userInfo.article_likes_ids.includes(this._id)) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			async _changeSaveStatus() {
				await this.checkedIsLogin()
				const resp = await this.$http.update_save_like({
					articleId: this._id,
					userId: this.userInfo._id
				})
				const {
					updateUserInfo,
					msg
				} = resp.data
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.updateUserInfo({
					...this.userInfo,
					...updateUserInfo
				})
			}
		}
	}
</script>

<style>

</style>
