'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		articleId,
		userId
	} = event
	const userInfo = await db.collection('user').doc(userId).get()
	const articleIds = userInfo.data[0].article_likes_ids
	let articleArr = null
	let msg = null
	if (articleIds.includes(articleId)) {
		// 删除操作
		articleArr = dbCmd.pull(articleId)
		msg = '取消收藏成功！'
	} else {
		// 添加操作
		articleArr = dbCmd.addToSet(articleId)
		msg = '收藏成功！'
	}
	// 修改当前用户的收藏文章数组
	await db.collection('user').doc(userId).update({
		article_likes_ids: articleArr
	})
	const newUserInfo = await db.collection('user').doc(userId).get()
	//返回数据给客户端
	return {
		code: 200,
		data: {
			msg,
			updateUserInfo: newUserInfo.data[0]
		}
	}
};
