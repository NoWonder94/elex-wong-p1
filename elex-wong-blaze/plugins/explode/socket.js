import store from "@/store/index"
import { getCode } from "./code"

let websock = null
let global_callback = null
let lockReconnect = false
let timeout = 3 * 1000
let timeoutObj = null
let serverTimeoutObj = null
let timeoutnum = null
let reconnectData = null

//weosocket init
let initWebSocket = () => {
  if (websock) {
    closeWebsocket()
  }
  try {
    let wsurl = window.server.SERVER_SOCKET_EXPLPDE + (localStorage.getItem('socket') || store.state.channelId)
    websock = new WebSocket(wsurl)
    websock.onopen = () => {
      websocketOpen()
    }
    websock.onerror = () => {
      websocketonerror()
    }
    websock.onclose = () => {
      websocketclose()
    }
    websock.onmessage = (e) => {
      websocketonmessage(e)
    }
  } catch (e) {
    lockReconnect = false
    reconnect()
  }
}
let reconnect = () => {
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  timeoutnum && clearTimeout(timeoutnum)
  timeoutnum = setTimeout(() => {
    initWebSocket()
    lockReconnect = false
  }, 2000)
}
let reset = () => {
  clearTimeout(timeoutObj)
  clearTimeout(serverTimeoutObj)
  start()
}
let start = () => {
  timeoutObj && clearTimeout(timeoutObj)
  serverTimeoutObj && clearTimeout(serverTimeoutObj)
  timeoutObj = setTimeout(() => {
    const msg = { contentType: '999' }
    websocketsend(JSON.stringify(msg))
    serverTimeoutObj = setTimeout(() => {
      websock.close()
    }, timeout)
  }, timeout)
}

//open
let websocketOpen = () => {
  if (websock.readyState === 1) {
    global_callback = null
    const msg = { contentType: '999' }
    websocketsend(JSON.stringify(msg))
  }
  if (reconnectData && websock.readyState === 1) {
    websocketsend(JSON.stringify(reconnectData))
    reconnectData = null
  }
  start()
}

//error
let websocketonerror = () => {
  lockReconnect = false
  reconnect()
}

//close
let websocketclose = () => {
  // store.commit("SET_LOGIN_READY", false)
}

//message
let websocketonmessage = (e) => {
  let _data = e.data
  // console.log(e.data)
  getCode(_data, global_callback)

  reset()
}

//send
let websocketsend = (data) => {
  if (websock.readyState == 1) {
    websock.send(data)
  }
}

// method
let sendSock = (code, _data, callback) => {
  const msg = {
    contentType: code,
    content: _data,
  }
  global_callback = callback
  if (websock.readyState == 1) {
    websocketsend(JSON.stringify(msg))
  } else if (websock.readyState == 2) {
    // console.log("The connection is closing")
  } else if (websock.readyState == 3) {
    reconnectData = msg
    lockReconnect = false
    reconnect()
    // console.log("Connecting to server, please wait.")
  }
}

// close
let closeWebsocket = () => {
  timeoutObj && clearTimeout(timeoutObj)
  serverTimeoutObj && clearTimeout(serverTimeoutObj)
  websock.close()
  websock = null
}

// init
// initWebSocket()

export { sendSock, start, closeWebsocket, initWebSocket, websock }
