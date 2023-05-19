import ajax from '../../http.js'
export const get_label_list = (data) => {
	return ajax({
		name: 'get_label_list'
	})
}
export const get_article_list = (data) => {
	return ajax({
		name: 'get_article_list',
		data
	})
}
export const update_save_like = (data) => {
	return ajax({
		name: 'update_save_like',
		data
	})
}
export const get_search_data = (data) => {
	return ajax({
		name: 'get_search_data',
		data
	})
}
export const update_label_ids = (data) => {
	return ajax({
		name: 'update_label_ids',
		data
	})
}
export const get_article_detail = (data) => {
	return ajax({
		name: 'get_article_detail',
		data
	})
}
export const update_comment = (data) => {
	return ajax({
		name: 'update_comment',
		data
	})
}
export const get_comment = (data) => {
	return ajax({
		name: 'get_comment',
		data
	})
}
