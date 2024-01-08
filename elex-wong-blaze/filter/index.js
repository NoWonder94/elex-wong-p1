// filter number add 0

const filter = {

    capitalize: function (value) {
        if (value === null || undefined) return 'Betting'
        let newValue = Number(value).toFixed(7)
        let len = 10
        let padChar = null || '0'
        if (!newValue) {
            return padChar.repeat(len);
        } else {
            const strLen = newValue.length;
            if (strLen > len) {
                return newValue.substring(0, len);
            } else if (strLen < len) {
                return newValue.padEnd(len, padChar);
            } else {
                return newValue;
            }
        }
    },

    capitalizes: function (value) {
        if (value === null || undefined) return 'Betting'
        let newValue = Number(value).toFixed(2)
        let len = 7
        let padChar = null || '0'
        if (!newValue) {
            return padChar.repeat(len);
        } else {
            const strLen = newValue.length;
            if (strLen > len) {
                return newValue.substring(0, len);
            } else if (strLen < len) {
                return newValue.padEnd(len, padChar);
            } else {
                return newValue;
            }
        }
        return newValue
    },

    retain: function (value) {
        if (value.length > 10) {
            let num = value.substring(0, 10) + "..."
            return num
        } else {
            return value
        }
    },

    retaineighteen: function (value) {
        if (value.length > 18) {
            let num = value.substring(0, 18) + "..."
            return num
        } else {
            return value
        }
    },

    experience: function (value) {
        if (value === null || undefined) return 'Betting'
        let newValue = Number(value).toFixed(2)

        return newValue
    },

    number: function (value) {
        if (value === null || undefined) {
            return 0 + '.00x'
        } else {
            let newValue = Number(value).toFixed(2) + 'x'
            return newValue
        }
    },

    // getTime: function (value, format = "YYYY-MM-DD hh:mm:ss") {

    //   var _data = value;
    //   // 如果是13位正常，如果是10位则需要转化为毫秒
    //   if (String(value).length == 13) {
    //     _data = value
    //   } else {
    //     _data = value * 1000
    //   }
    //   const time = new Date(_data);
    //   const Y = time.getFullYear();
    //   const Mon = time.getMonth() + 1;
    //   const Day = time.getDate();
    //   const H = time.getHours();
    //   const Min = time.getMinutes();
    //   const S = time.getSeconds();
    //   return format.replace('YYYY', Y).replace("MM", Mon).replace('DD', Day).replace('hh', H).replace('mm', Min).replace('ss', S)
    // },


    getTime: function (date) {
        date = Number(date);
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    },

    getChatHouer: function (value, format = "hh:mm") {
        var _data = value;
        // 如果是13位正常，如果是10位则需要转化为毫秒
        if (String(value).length == 13) {
            _data = value
        } else {
            _data = value * 1000
        }
        const time = new Date(Number(_data));
        const H = time.getHours();
        const Min = time.getMinutes();
        if (Min < 10) {
            return `${H}` + ':' + '0' + `${Min}`
        } else {
            return format.replace('hh', H).replace('mm', Min)
        }
    },
    //获取货币名称
    currentCurrency: function (value) {
        let walletInfo = JSON.parse(localStorage.getItem('walletInfo'))
        // console.log(walletInfo, 'walletInfo1111111111111');
        let walletItem = walletInfo.find(item => item.currencyId == value)
        let newValue = walletItem.currencyName
        return newValue
    },
    // 获取用户头像
    imgchange(data) {
        // console.log(data, '--------------');
        if (data) {
            let avatarArr = "'01','02','03','04','05','06'"
            if (avatarArr.indexOf(data) >= 0) {
                data = require(`@/assets/image/mine/${data}.png`);
            }
            return data;
        } else {
            return require("@/assets/image/mine/01.png");
        }
    },
}

export default filter