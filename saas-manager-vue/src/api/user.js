import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getCodeImg() {
  return request({
    url: '/user/code',
    method: 'get'
  })
}
export function postEmail(data) {
  return request({
    url: '/user/verify/' + data,
    method: 'post'
  })
}
export function sentEmail(data) {
  return request({
    url: `/user/verify/${data}`,
    method: 'post'
  })
}
//
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}
