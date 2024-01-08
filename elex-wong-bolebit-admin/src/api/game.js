import request from '@/utils/request'

export function getGameList(data) {
  return request({
    url: '/api/Admin/listGame',
    method: 'post',
    data
  })
}

export function createGameList(data) {
  return request({
    url: '/api/Admin/createGame',
    method: 'post',
    data
  })
}

export function updateGameList(data) {
  return request({
    url: '/api/Admin/updateGame',
    method: 'post',
    data
  })
}

export function deleteGameList(data) {
  return request({
    url: '/api/Admin/deleteGame',
    method: 'post',
    data
  })
}

export function getGameDetail(id) {
  return request({
    url: '/api/Admin/game/' + id,
    method: 'post'
  })
}
