export default {
	updateUserInfo(state, userInfo) {
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	setHistory(state, value) {
		let list = state.historyList
		if (list.length > 0 && list.findIndex(item => item === value) > -1) return
		list.unshift(value)
		uni.setStorageSync('historyList', list)
		state.historyList = list
	},
	claenHistory(state) {
		uni.setStorageSync('historyList', [])
		state.historyList = []
	},
	setLabelList(state, list) {
		state.labelList = list
		uni.setStorageSync('labelList', list)
	}
}