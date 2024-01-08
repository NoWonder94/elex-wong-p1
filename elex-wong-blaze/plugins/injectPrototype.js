
import Vue from 'vue';
import vueFilter from '@/plugins/filters.js'
import Socket from './socket'
import AdjustEvent from './adjust'
export default function () {
    Vue.prototype.$Socket = Socket

    Vue.prototype.$AdjustEvent = new AdjustEvent()

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

    for (const key in vueFilter) {
        Vue.filter(key, vueFilter[key])
    }
    Vue.use(vueFilter)

    Vue.prototype.$tt = function (key) {
        return this.$t(key, { brand: this.$config.site_name, brand_url: this.$config.display_url })
    }

}