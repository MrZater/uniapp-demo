'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		content,
		comment_id = '',
		reply_id = '',
		is_reply = false
	} = event

	// 进行用户信息获取
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]

	const article = await db.collection('article').doc(article_id).get()
	const comments = article.data[0].comments
	let commentObj = {
		comment_id: generatedId(5),
		comment_content: content,
		create_time: Date.now(),
		is_reply,
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replyArr: []
	}
	if (comment_id === '') {
		commentObj.replyArr = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		let commentAuthor = null;
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		if (is_reply) {
			commentAuthor = comments[commentIndex].replyArr.find(item => item.comment_id === reply_id).author
				.author_name
		} else {
			commentAuthor = comments.find(item => item.comment_id === comment_id).author.author_name
		}
		commentObj.to = commentAuthor
		commentObj = {
			[commentIndex]: {
				replyArr: dbCmd.unshift(commentObj)
			}
		}
	}
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})


	function generatedId(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36)
	}

	//返回数据给客户端
	return {
		code: 200,
		data: {
			msg: '添加数据成功'
		}
	}
};