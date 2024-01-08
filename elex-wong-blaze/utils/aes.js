import CryptoJS from "crypto-js"

//absoietlj32fai12 对密钥进行加密
var publicKey = "gKsz8+1m3HWvRAz+6tI7U8dxe+me0fvvj+Qz1MsjqQg=";
var ivKey = "gKsz8+1m3HWvRAz+6tI7U8dxe+me0fvvj+Qz1MsjqQg=";

var publicKeyDef = "gKsz8+1m3HWvRAz+6tI7U8dxe+me0fvvj+Qz1MsjqQg=";
var ivKeydef = "gKsz8+1m3HWvRAz+6tI7U8dxe+me0fvvj+Qz1MsjqQg=";
export default {
  encrypt(word, keyStr, ivStr) {
    let token = localStorage.getItem("authToken");
    if (token) {
      publicKey = localStorage.getItem('enc')
    }
    keyStr = keyStr ? keyStr : publicKey;
    ivStr = ivStr ? ivStr : ivKey;
    keyStr = this.decryptECB(keyStr)
    ivStr = this.decryptECB(ivStr)
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    let words = CryptoJS.enc.Utf8.parse(word);
    var encrypt = CryptoJS.AES.encrypt(words, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
  },
  decrypt(word, keyStr, ivStr) {
    let token = localStorage.getItem("authToken");
    if (token) {
      publicKey = localStorage.getItem('enc')
    }

    keyStr = keyStr ? keyStr : publicKey;
    ivStr = ivStr ? ivStr : ivKey;
    keyStr = this.decryptECB(keyStr)
    ivStr = this.decryptECB(ivStr)
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64)

    var decrypts = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypts).toString();
  },
  //ECB加密
  encryptECB(encryptData) {
    var key = CryptoJS.enc.Utf8.parse("cryptos-js-tests")
    var srcs = CryptoJS.enc.Utf8.parse(encryptData)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  decryptECB(encryptData) {
    var key = CryptoJS.enc.Utf8.parse("cryptos-js-tests")
    var decrypt = CryptoJS.AES.decrypt(encryptData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },


  dealKeys(publicKeys) {
    var key = this.encryptECB(publicKeys)
    localStorage.setItem('enc', key)
    publicKey = key
  },
  systemDefKey() {
    publicKey = publicKeyDef
  }
}
