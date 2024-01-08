// filter number add 0

const filter = {

  install(Vue) {
    Vue.prototype.FillZero = function (data) {

      let str = parseFloat(data).toString();

      if (str.indexOf(".") != -1) {

        let str1 = str.split(".")[0];


        let n = 8 - str1.length;
        str = Number(str).toFixed(n);

      } else {

        let n = 8 - str.length;
        str = Number(str).toFixed(n);
      }
      return str;
    }
    Vue.prototype.BetSection = function (gameId, currencyId) {
      let list = JSON.parse(localStorage.getItem('BetSection'))
      // console.log(list);
      let obj = list && list.find(value => value.gameId == gameId && value.currencyId == currencyId)
      return obj;
    }
    Vue.prototype.amend = function (num1, num2, symbol) {
      var str1 = num1.toString(),
        str2 = num2.toString(),
        result,
        str1Length,
        str2Length;
      //解决整数没有小数点方法
      try {
        str1Length = str1.split(".")[1].length;
      } catch (error) {
        str1Length = 0;
      }
      try {
        str2Length = str2.split(".")[1].length;
      } catch (error) {
        str2Length = 0;
      }
      var step = Math.pow(10, Math.max(str1Length, str2Length));
      //

      switch (symbol) {
        case "+":
          result = (num1 * step + num2 * step) / step;
          break;
        case "-":
          result = (num1 * step - num2 * step) / step;
          break;
        case "*":
          result = (num1 * step * (num2 * step)) / step / step;
          break;
        case "/":
          result = (num1 * step) / (num2 * step);
          break;
        default:
          break;
      }
      return parseFloat(result.toPrecision(12));
    }

    // 数字类型保留小数
    Vue.prototype.getFloat = function (number, n) {
      n = n ? parseInt(n) : 0
      if (n <= 0) {
        return Math.round(number)
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n)
      number = Number(number).toFixed(n)
      return number
    }

    // 数字变动函数
    // Vue.prototype.changeNumber(start, end){
    //   var i = start;
    //   var Interval;
    //   if (i < end) {
    //     Interval = setInterval(function () {
    //       i += 200
    //       if (i > end) {
    //         clearInterval(Interval);
    //         o.innerHTML = end.toLocaleString();
    //         i = 0;
    //       }
    //     }, 10);
    //   }
    // }
  },

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
        data = require(`@/assets/img/mine/${data}.png`);
      }
      return data;
    } else {
      return require("@/assets/img/mine/01.png");
    }
  },
}

export default filter
