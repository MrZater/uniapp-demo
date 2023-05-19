export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					mobileReg: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
					userRules: {
						loginName: {
							rules: [{
									required: true,
									'errorMessage': '账户名不能为空'
								},
								{
									validateFunction: this.validateLoginName
								}
							]
						},
						password: {
							rules: [{
								required: true,
								'errorMessage': '请输入密码'
							}]
						},
						phone: {
							rules: [{
									required: true,
									'errorMessage': '手机不能为空'
								},
								{
									validateFunction: this.validatePhone
								}
							]
						},
						vCode: {
							rules: [{
								required: true,
								'errorMessage': '验证码不能为空'
							}]
						}
					}
				}
			},
			methods: {
				// 用户名验证函数
				validateLoginName(rule, val, data, callback) {
					switch (true) {
						case val.length < 6:
							callback('用户名长度太短')
							break
						case val.length > 16:
							callback('用户名长度太长')
							break
						default:
							return true
					}
				},
				validatePhone(rule, val, data, callback) {
					switch (true) {
						case !this.mobileReg.test(val):
							callback('手机号格式不正确')
							break
						default:
							return true
					}
				}
			}
		})
	}
}
