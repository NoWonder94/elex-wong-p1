export class NumberFormatHelper {
    /**
     * 进度转换
     * @param p 进度
     * @returns 
     */
    public static progress2Percent(p: number) {
        p = (p > 1) ? 1 : p;
        p = (p < 0) ? 0 : p;
        return `${Math.floor(p * 100)}%`
    }
}