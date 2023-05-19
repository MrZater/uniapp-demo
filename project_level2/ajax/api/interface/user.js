import ajax from '../../http.js'
export const user_login = (data) => {
	return ajax({
		name: 'user_login',
		data
	})
}
export const get_code = (data) => {
	return ajax({
		name: 'get_code',
		data
	})
}



