class ServerConfig {
    constructor(url, socketUrl, encrypt) {
        this.endPointUrl = url;
        this.socketUrl = socketUrl;
        this.encryption = encrypt;
    }
}
export default ServerConfig
