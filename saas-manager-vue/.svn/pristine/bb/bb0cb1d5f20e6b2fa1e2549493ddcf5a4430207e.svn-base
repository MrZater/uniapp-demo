import request from '@/utils/request'
export function accountList(data) {
  return request({
    url: '/user/subAccountPager',
    method: 'post',
    data
  })
}
export function updateAccount(data) {
  return request({
    url: '/user/updateSubAccount',
    method: 'post',
    data
  })
}

export function handlePermissions(data) {
  return request({
    url: '/user/bindPlat',
    method: 'post',
    data
  })
}

export function delSonAccount(params) {
  return request({
    url: `/user/${params.id}`,
    method: 'Delete'
  })
}
// 修改用户信息
export function updateAccountInfo(data) {
  return request({
    url: `/user/updateAccountInfo`,
    method: 'post',
    data
  })
}

// 新增账户
export function addAccount(data) {
  return request({
    url: '/user/addSubAccount',
    method: 'post',
    data
  })
}
// 商务用户列表
export function getBusinessIdOptions() {
  return request({
    url: '/user/businessUserList',
    method: 'get'
  })
}

// 账户管理查询管理员列表
export function getAdminListForEdit(data) {
  return request({
    url: '/user/filterAccount',
    method: 'post',
    data
  })
}
