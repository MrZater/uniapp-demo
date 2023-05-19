// 得到当前目录下的导出集合
const requireApi = require.context('.', true, /.js$/)
let module = {}
requireApi.keys().forEach((key, index) => {
	// 排除该文件
	if (key == './index.js') return
	// 将导出加入到module中
	Object.assign(module, requireApi(key))
})
export default module
