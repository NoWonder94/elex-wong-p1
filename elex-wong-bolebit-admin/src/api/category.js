import request from '@/utils/request'

export function getCateList() {
  return request({
    url: '/api/Admin/listCategory',
    method: 'post'
  })
}

export function createCateList(data) {
  return request({
    url: '/api/Admin/createCategory',
    method: 'post',
    data
  })
}

export function updateCateList(data) {
  return request({
    url: '/api/Admin/updateCategory',
    method: 'post',
    data
  })
}

export function deleteCateList(data) {
  return request({
    url: '/api/Admin/deleteCategory',
    method: 'post',
    data
  })
}
