'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		article_id
	} = event
	const res = await db.collection('article').aggregate().match({
		_id: article_id
	})
	.project({
		comments:0
	})
	.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '文章获取成功！',
		data: res.data[0]
	}
};