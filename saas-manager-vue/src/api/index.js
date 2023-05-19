
import request from '@/utils/request'

export function incomeData(data) {
  return request({
    url: '/dashboard/overview',
    method: 'post',
    data
  })
}
export function homeEcharts(data) {
  return request({
    url: '/dashboard/trend',
    method: 'post',
    data
  })
}
// 获取欢迎头部信息
export function welcomeToDescribe() {
  return request({
    url: '/dashboard/welcomeToDescribe',
    method: 'get'
  })
}
// 获取商务列表
export function getBusinessList() {
  return request({
    url: '/dashboard/getBusinessList',
    method: 'get'
  })
}
// 获取表单数据
export function getTableList(data) {
  return request({
    url: '/dashboard/report',
    method: 'post',
    data
  })
}
// 获取汇总数据
export function getRepoerSum(data) {
  return request({
    url: '/dashboard/repoerSum',
    method: 'post',
    data
  })
}
