'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		classify,
		page = 1,
		pageSize = 10
	} = event;
	let matchObj = {}
	if (classify !== '全部') {
		matchObj = {
			classify
		}
	}
	const list = await db.collection('article')
		.aggregate()
		.match(matchObj)
		.project({
			content: 0
		})
		.skip((page - 1) * pageSize)
		.limit(pageSize)
		.end()
	const {
		total
	} = await db.collection('article').where(matchObj).count()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据获取成功！',
		data: {
			articleList: list.data,
			total: total
		}
	}
};
