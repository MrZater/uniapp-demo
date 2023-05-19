import request from '@/utils/request'

export function getSynthReport(data) {
  return request({
    url: '/report/fullReport',
    method: 'post',
    data
  })
}
// 广告平台
export function advertPlatform() {
  return request({
    url: '/plat/platList',
    method: 'get'

  })
}
export function platListByUser(data) {
  return request({
    url: '/plat/platListByUser',
    method: 'post',
    data

  })
}
//  流量分组
export function flowGroups() {
  return request({
    url: '/aggregate/groupList',
    method: 'get'
  })
}
//  渠道
export function getChannel() {
  return request({
    url: '/app/channelList',
    method: 'get'
  })
}
//  代码位
export function codeBit() {
  return request({
    url: '/aggregate/sourceList',
    method: 'get'
  })
}
//  应用影响 流量分组
export function appToFlow(data) {
  return request({
    url: '/aggregate/groupListByApp',
    method: 'post',
    data

  })
}
//  应用影响 广告位
export function appToAdvert(data) {
  return request({
    url: '/place/listByAppIds',
    method: 'post',
    data
  })
}
//  应用影响 代码位
export function appToCode(data) {
  return request({
    url: 'aggregate/sourceListByApp',
    method: 'post',
    data
  })
}
//  广告位影响代码位
export function advertToCode(data) {
  return request({
    url: '/aggregate/sourceListByAdplace',
    method: 'post',
    data
  })
}
//  广告位影响流量分组
export function advertToFlow(data) {
  return request({
    url: 'aggregate/groupListByAdplace',
    method: 'post',
    data
  })
}
// 用户行为报表

export function userActionReport(data) {
  return request({
    url: '/userBehavior/report',
    method: 'post',
    data
  })
}
export function userActionTrend(data) {
  return request({
    url: '/userBehavior/trend',
    method: 'post',
    data
  })
}

// 分小时 曲线
export function hoursEcharts(data) {
  return request({
    url: '/report/hourTrend',
    method: 'post',
    data
  })
}
// 分小时报表
export function hoursReport(data) {
  return request({
    url: '/report/hourReport',
    method: 'post',
    data
  })
}
// 导入报表
export function importReport(data) {
  return request({
    url: '/report/upload',
    method: 'post',
    data
  })
}
// 报表上传记录
export function ReportList(data) {
  return request({
    url: '/report/record',
    method: 'post',
    data
  })
}

export function industrySelect(data) {
  return request({
    url: '/app/tradeList',
    method: 'get',
    data
  })
}
// 编辑审核信息
export function editAudit(data) {
  return request({
    url: '/place/updateAudit',
    method: 'post',
    data
  })
}
// 获取媒体报表数据
export function getMediaReport(data) {
  return request({
    url: '/report/getMediaReport',
    method: 'post',
    data
  })
}

// 修改媒体报表页 数据审核状态以及广告位分成比例 数据
export function updateMediaReportInfo(data) {
  return request({
    url: '/place/updateMediaReportInfo',
    method: 'post',
    data
  })
}

// 获取综合报表图表数据
export function getSynthReportData(data) {
  return request({
    url: '/report/chart',
    method: 'post',
    data
  })
}

