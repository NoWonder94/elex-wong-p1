const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  baseToken: state => state.app.baseToken,
  avatar: state => state.user.avatar,
  user: state => state.user.info,
  name: state => state.user.info.username,
  languages: state => state.app.langs
}
export default getters
