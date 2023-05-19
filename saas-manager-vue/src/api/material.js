import request from '@/utils/request'
// 获取api广告源列表
export function apiPlatformList() {
  return request({
    url: '/plat/api_platform_list',
    method: 'get'
  })
}
// 获取审核人员列表
export function auditUserList(data) {
  return request({
    url: '/user/audit_user_list?userId=' + data,
    method: 'get'
  })
}
// 获取素材列表
export function getMaterialList(data) {
  return request({
    url: '/creative/pager',
    method: 'post',
    data
  })
}
// 审核
export function auditMaterial(data) {
  return request({
    url: '/creative/audit',
    method: 'post',
    data
  })
}
// 修改标签
export function updateTags(data) {
  return request({
    url: '/creative/updateTags',
    method: 'post',
    data
  })
}

// 获取审核列表数据
export function getMaterialReport(data) {
  return request({
    url: '/creative/report',
    method: 'post',
    data
  })
}
//

export function getAdminIDListInMaterial() {
  return request({
    url: '/user/user_list_by_creative',
    method: 'get'

  })
}
