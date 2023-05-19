import request from '@/utils/request'
// 新增

// 素材模板下拉
export function materialTemp() {
  return request({
    url: '/creative/templateList',
    method: 'get'
  })
}
export function addMedproSDK(data) {
  return request({
    url: '/accessCenter/addSdk',
    method: 'post',
    data
  })
}
export function editMedproSDK(data) {
  return request({
    url: '/accessCenter/updateSdk',
    method: 'post',
    data
  })
}
// 列表
export function medproSdkList(data) {
  return request({
    url: '/accessCenter/getSdkPager',
    method: 'post',
    data
  })
}

// 版本号下拉框
export function versionList(data) {
  return request({
    url: '/accessCenter/getPublishedSdkList',
    method: 'post',
    data
  })
}

// 广告源  列表

export function advertSource(data) {
  return request({
    url: '/accessCenter/getSourceSdkPackagePager',
    method: 'post',
    data
  })
}

export function advertSourceById(data) {
  return request({
    url: '/accessCenter/getSourceSdkAndPositionById/' + data,
    method: 'post'
  })
}
export function addadvertSource(data) {
  return request({
    url: '/accessCenter/addSourceSdkPackage',
    method: 'post',
    data
  })
}
// 编辑 广告源 sdk
export function editadvertSource(data) {
  return request({
    url: '/accessCenter/updateSourceSdkPackage',
    method: 'post',
    data
  })
}
// 绑定 广告源

export function bindAdvertSource(data) {
  return request({
    url: '/accessCenter/bindingSource',
    method: 'post',
    data
  })
}
// // 广告源 弹框
export function bindAdvertList(data) {
  return request({
    url: '/accessCenter/getSourceSdkList?os=' + data,
    method: 'get'

  })
}
// // 编辑 广告源
export function editAdvertList(data) {
  return request({
    url: '/accessCenter/getSourceSdkById',
    method: 'post',
    data

  })
}
// 更新日志
export function updateLog(data) {
  return request({
    url: `/accessCenter/getSdkModifyLogByOs`,
    method: 'post',
    data
  })
}
// 下载sdk
export function downLoadSDK(data) {
  return request({
    url: `/accessCenter/downloadSdk`,
    method: 'post',
    data
  })
}

// // 进度条回显
// export function progessLine(data) {
//   return request({
//     url: `/accessCenter/process`,
//     method: 'post',
//     data
//   })
// }



