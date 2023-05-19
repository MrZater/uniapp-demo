
import request from '@/utils/request'

// 漏斗数据报表
export function funnelReport(data) {
  return request({
    url: '/filler_report/report',
    method: 'post',
    data
  })
}
