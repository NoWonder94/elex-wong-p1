export class StringHelper {
    /**
     * 首字母大写
     * @param str 字符串
     */
    public static firstToUpper(str: string) {
        return str.trim().replace(str[0], str[0].toUpperCase());
    }
}