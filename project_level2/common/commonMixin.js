import {
	mapState,
	mapMutations
}
from 'vuex';
export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {

				}
			},
			computed: {
				...mapState(['userInfo'])
			},
			methods: {
				...mapMutations(['updateUserInfo']),
				checkedIsLogin() {
					return new Promise(resolve => {
						// 获取用户信息
						if (this.userInfo) {
							resolve()
						} else {
							uni.navigateTo({
								url: '/pages/userInfo/login/login'
							})
						}
					})

				}
			}
		})
	}
}
