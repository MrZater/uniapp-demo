'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		article_id,
		pageSize = 10,
		page = 1
	} = event

	const list = await db.collection('article').aggregate().match({
			_id: article_id
		}).unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: '$comments'
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()
	return {
		code: 200,
		msg: '评论内容获取成功！',
		data: list.data
	}
};