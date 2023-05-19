import request from '@/utils/request'

export function getTotalIncome() {
  return request({
    url: '/dashboard/getTotalIncome',
    method: 'get'
  })
}

export function getPieChartData(data) {
  return request({
    url: '/dashboard/pie-dimension',
    method: 'post',
    data
  })
}
