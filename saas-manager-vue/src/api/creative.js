import request from '@/utils/request'

export function getCreativePager(data) {
  return request({
    url: '/creative/getCreativePager',
    method: 'post',
    data
  })
}

export function updateCreativeAuditSts(data) {
  return request({
    url: '/creative/updateCreativeAuditSts',
    method: 'post',
    data
  })
}

export function updateCreativePutOffSts(data) {
  return request({
    url: '/creative/updateCreativePutOffSts',
    method: 'post',
    data
  })
}
