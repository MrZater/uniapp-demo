import request from '@/utils/request'

export function getUlogReport(data) {
  return request({
    url: '/user/getLogPage',
    method: 'post',
    data
  })
}
