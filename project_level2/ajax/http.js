export default({name, data = {}}) => {
	return new Promise((resolve, reject) => {
		// 开启loading
		uni.showLoading({})
		// 发送网络请求
		uniCloud.callFunction({
			// 云函数名
			name,
			data,
			// 成功回调
			success: ({result}) => {
				// 200状态码
				if (result.code === 200) {
					resolve(result)
				} else {
					// 其他状态码，提示字段
					uni.showToast({
						icon: 'none',
						title: result.msg
					})
				}
			},
			// 网络等问题失败回调
			fail: (err) => {
				reject(err)
			},
			// 结束回调，关闭loading
			complete() {
				uni.hideLoading()
			}
		})
	})
}
