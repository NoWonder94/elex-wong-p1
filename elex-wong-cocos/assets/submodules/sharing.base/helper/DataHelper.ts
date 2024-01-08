export interface RangeValueConfigItem {
    range: number[],
    value: any;
}

export class DataHelper {
    static getRangeValueItem(value: number, configs: RangeValueConfigItem[]) {
        let item: RangeValueConfigItem = null;
        for (let i = 0; i < configs.length; i++) {
            const range = configs[i].range;
            const rng1 = range[0];
            const rng2 = range[1];
            if (rng1 == null && value <= rng2 || rng2 == null && value >= rng1 ||
                value > rng1 && value <= rng2) {
                item = configs[i];
                break;
            }
        }
        return item;
    }

    /**
     * 多数组求组合
     */
    static arrayComposition(arr:any[]){
        var len = arr.length;
        // 当数组大于等于2个的时候
        if(len >= 2){
            // 第一个数组的长度
            var len1 = arr[0].length;
            // 第二个数组的长度
            var len2 = arr[1].length;
            // 2个数组产生的组合数
            var lenBoth = len1 * len2;
            //  申明一个新数组
            var items = new Array(lenBoth);
            // 申明新数组的索引
            var index = 0;
            for(var i=0; i<len1; i++){
                for(var j=0; j<len2; j++){
                    if(arr[0][i] instanceof Array){
                        items[index] = arr[0][i].concat(arr[1][j]);
                    }else{
                        items[index] = [arr[0][i]].concat(arr[1][j]);
                    }
                    index++;
                }
            }
            var newArr = new Array(len -1);
            for(var i=2;i<arr.length;i++){
                newArr[i-1] = arr[i];
            }
            newArr[0] = items;
            return this.arrayComposition(newArr);
        }else{
            return arr[0];
        }
    }
}