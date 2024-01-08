/* eslint-disable no-case-declarations */
import Vue from "vue"
import request from "./request"
import {start} from "./socket"

export let getCode = (_data, global_callback) => {
  // console.log(JSON.parse(_data))
  let _opcode = JSON.parse(_data).opcode
  let _value = JSON.parse(_data).value
  switch (_opcode) {
    // 登陆成功
    case "sc_login_suc":
      request.requestActInfo()
      request.requestActLog()
      request.requestRedPacket()
      let par = Vue.prototype.$base.getSignData({
        uid: _value.uid,
        timestamp: parseInt(new Date().getTime() / 1000),
      })
      Vue.prototype.$apiList.apiLogin.postUserInfo(par)
      if (global_callback) {
        global_callback(_value)
      } else {
        Vue.prototype.$base.sendTrack({
          event: "login_success",
          content: "success",
        })
        system.login(_value)
      }
      let par_1 = Vue.prototype.$base.getSignData({
        uid: _value.uid,
        timestamp: parseInt(new Date().getTime() / 1000),
      })
      Vue.prototype.$apiList.apiUser.getUserType(par_1).then((res) => {
        system.setUserType(res.data.user_type)
      })
      break
    // 心跳
    case "sc_ping":
      start()
      break
    default:
      sessionStorage.setItem(_opcode, _data)
  }
}
