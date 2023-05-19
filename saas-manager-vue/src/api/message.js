import request from '@/utils/request'

// 消息通知列表
export function messagePage(data) {
  return request({
    url: '/message/page',
    method: 'post',
    data
  })
}

// 新增消息通知
export function addMessage(data) {
  return request({
    url: '/message/add',
    method: 'post',
    data
  })
}

// 修改消息通知
export function editMessage(data) {
  return request({
    url: '/message/update',
    method: 'post',
    data
  })
}

// 消息通知列表
export function getReadPage(data) {
  return request({
    url: '/message/readPage',
    method: 'post',
    data
  })
}

// 消息批量操作
export function updateReadSts(data) {
  return request({
    url: '/message/updateReadSts',
    method: 'post',
    data
  })
}
