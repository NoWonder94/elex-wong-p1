import request from '@/utils/request'

export function getBaseToken() {
  return request({
    url: '/api/App/token?client=pc',
    method: 'post'
  })
}
