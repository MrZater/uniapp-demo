'use strict';
exports.main = async (event, context) => {
	const {
		phone
	} = event
	// 创建一个随机数
	const currentNumber = Math.random().toString().substr(2, 6)
	//返回数据给客户端
	return event
};
