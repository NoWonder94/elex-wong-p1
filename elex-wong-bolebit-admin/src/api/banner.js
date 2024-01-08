import request from '@/utils/request'

export function getBannerList() {
  return request({
    url: '/api/Admin/listBanner',
    method: 'post'
  })
}

export function createBannerList(data) {
  return request({
    url: '/api/Admin/createBanner',
    method: 'post',
    data
  })
}

export function updateBannerList(data) {
  return request({
    url: '/api/Admin/updateBanner',
    method: 'post',
    data
  })
}

export function deleteBannerList(data) {
  return request({
    url: '/api/Admin/deleteBanner',
    method: 'post',
    data
  })
}
