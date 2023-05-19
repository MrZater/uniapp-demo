'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 得到label集合
	const collection = db.collection('label')
	// 集合的引用
	const res = await collection.get()
	//返回数据给客户端
	return {
		code: 200,
		data: res.data,
	}
};
