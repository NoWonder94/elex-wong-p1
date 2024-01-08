import aes from "@/utils/aes.js"
class Socket {
  constructor(obj) {
    this.url = obj.url
    this.heartMsg = obj.heartMsg || {
      contentType: '999'
    }
    this.timeOut = obj.time || (3 * 1000)
    this.websock = null
    this.reconnectData = null
    this.timeoutNum = null
    this.timeoutObj = null
    this.serverTimeoutObj = null
    this.message = {}
    this.gameID = obj.gameID || ''
    this.isLogin = obj.isLogin
    this.initWebSocket()
  }

  //websocket init
  initWebSocket() {
    if (this.websock) {
      this.close()
    }
    try {
      this.websock = new WebSocket(this.url + (localStorage.getItem('socket') || (localStorage.getItem('channelId') || $nuxt.$config.channel_id)) + this.gameID)
      this.websock.onopen = () => {
        this.onOpen()
      }
      this.websock.onerror = () => {
        this.onError()
      }
      this.websock.onclose = (e) => {
        this.onClose(e)
      }
      this.websock.onmessage = (e) => {
        this.onMessage(e)
      }
    } catch (e) {
      this.lockReconnect = false
    }
  }
  handleReconnect() {
    this.reconnect()
  }
  // reconnect
  reconnect() {
    if (this.lockReconnect) {
      return
    }
    this.lockReconnect = true
    this.timeoutNum && clearTimeout(this.timeoutNum)
    this.timeoutNum = setTimeout(() => {
      this.initWebSocket()
      this.lockReconnect = false
    }, 2000)
  }

  // reset heart
  reset() {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    this.start()
  }

  // start heart
  start() {
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    // console.log("start connnect")
    this.timeoutObj = setTimeout(() => {
      this.send(JSON.stringify(this.heartMsg))
      this.serverTimeoutObj = setTimeout(() => {
        // this.websock.close()
      }, this.timeOut)
    }, this.timeOut)
  }

  // open
  onOpen() {
    if (this.websock.readyState === 1) {
      // this.callback = null
      this.send(JSON.stringify(this.heartMsg))
      // this.sendSock(JSON.stringify(this.heartMsg))
    }
    if (this.reconnectData && this.websock.readyState === 1) {
      this.send(JSON.stringify(this.reconnectData))
      // this.sendSock(JSON.stringify(this.reconnectData))
      this.reconnectData = null
    }
    this.start()
    this.update('connect')
  }

  //error
  onError() {
    this.lockReconnect = false
    // this.reconnect()
  }

  //close
  onClose(e) {
    // store.commit("SET_LOGIN_READY", false)
    this.update('close', e)
    // this.$message({
    //   message: 'Connecting to server, please wait.',
    //   type: "warning",
    // });
    // this.reconnect()
  }

  //message
  onMessage(e) {
    let dat = e.data
    if ($nuxt.$config.encryption) {
      dat = aes.decrypt(dat)
      dat = dat.substring(0, dat.lastIndexOf("}") + 1);
    }
    let _data = dat
    this.update('message', _data)
    this.reset()
  }
  // socket before send message
  sendSock(data) {
    if (this.websock.readyState == 1) {
      this.websock.send(data)
    }
  }

  // ===================  methods  =================

  // send
  send(data) {
    if ($nuxt.$config.encryption) {
      if (typeof data == 'string') {
        data = aes.encrypt(data)
      } else {

        data = aes.encrypt(JSON.stringify(data))
      }
    } else {
      if (typeof data == 'string') {
        data = data
      } else {
        data = JSON.stringify(data)
      }
    }
    const msg = data
    if (this.websock.readyState == 1) {
      this.sendSock(msg)
    } else if (this.websock.readyState == 2) {
      // console.log("The connection is closing")
    } else if (this.websock.readyState == 3) {
      this.reconnectData = msg
      this.lockReconnect = false
      // this.reconnect()
      // console.log("Connecting to server, please wait.")
    }
  }

  // close
  close() {
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.websock.close()
    this.websock = null
  }

  // ===================  listener  =================

  on(type, fn) {
    if (typeof this.message[type] === 'undefined')
      this.message[type] = fn
  }

  update(type, _data) {
    if (!this.message[type]) return
    this.message[type].call(this, _data)
  }

  off() {

  }
}

export default Socket