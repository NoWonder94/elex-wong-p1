export class ComposeHelper {
    public static getResult(data: any[][]) {
        return this.compose.apply(this, data)
    }
    /** 求组合 */
    private static compose() {
        let heads = arguments[0];
        for (let i = 1, len = arguments.length; i < len; i++) {
            if (heads.length > 0 && arguments[i].length > 0) {
                heads = this.addNewItem(heads, arguments[i]);
            }
        }
        return heads;
    }

    private static addNewItem(heads, choices) {
        let result = [];
        for (let i = 0, len = heads.length; i < len; i++) {
            for (let j = 0, lenj = choices.length; j < lenj; j++) {
                result.push(heads[i] + ',' + choices[j]);
            }
        }
        return result;
    }
}