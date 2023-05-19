'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		loginName,
		password,
		phone,
		type
	} = event
	const {
		affectedDocs,
		data
	} = await db.collection('user')
		.aggregate()
		.match(type === 'account' ? {
			loginName,
			password
		} : {
			phone
		})
		.end()
	//返回数据给客户端
	return affectedDocs ? {
		code: 200,
		msg: '获取用户信息成功！',
		data: data[0],
	} : {
		code: 1,
		msg: type === 'account' ? "获取用户信息失败，请检查用户名密码" : "验证码或手机号码有误！"
	}
};
