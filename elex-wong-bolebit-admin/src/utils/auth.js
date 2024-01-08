import Cookies from 'js-cookie'

const UserTokenKey = 'user_token'
const BaseTokenKey = 'base_token'

/* manage base token in to cookies */
export function getBaseToken() {
  return Cookies.get(BaseTokenKey)
}

export function setBaseToken(Basetoken) {
  return Cookies.set(BaseTokenKey, Basetoken)
}

export function removeBaseToken() {
  return Cookies.remove(BaseTokenKey)
}

/* manage user token in to cookies */
export function getUserToken() {
  return Cookies.get(UserTokenKey)
}

export function setUserToken(token) {
  return Cookies.set(UserTokenKey, token)
}

export function removeUserToken() {
  return Cookies.remove(UserTokenKey)
}
