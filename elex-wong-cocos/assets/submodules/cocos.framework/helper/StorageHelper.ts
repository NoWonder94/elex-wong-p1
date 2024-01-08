
import { sys } from "cc";
import { Base64 } from "../../sharing.base/helper/Base64";

export class StorageHelper {
    public static get(key) {
        return sys.localStorage.getItem(key);
    }

    public static set(key, value) {
        sys.localStorage.setItem(key, value);
    }

    public static clear() {
        sys.localStorage.clear();
    }

    public static remove(key) {
        sys.localStorage.removeItem(key);
    }

    public static getInt(key: string) {
        const value = sys.localStorage.getItem(key);
        if (value != null) {
            return parseInt(value);
        }
    }

    public static setInt(key: string, value: number) {
        sys.localStorage.setItem(key, value.toString());
    }

    public static getBool(key: string) {
        const value = sys.localStorage.getItem(key);
        if (value != null) {
            return parseInt(value) == 1;
        }
    }

    public static setBool(key: string, value: boolean) {
        sys.localStorage.setItem(key, value ? "1" : "0");
    }

    public static getFloat(key: string) {
        const value = sys.localStorage.getItem(key);
        if (value != null) {
            return parseFloat(value);
        }
    }

    public static setFloat(key: string, value: number) {
        sys.localStorage.setItem(key, value.toString());
    }

    public static setJson(key: string, value: any) {
        this.set(key, JSON.stringify(value));
    }

    public static getJson(key: string) {
        let value = this.get(key);
        if (!value) {
            return null;
        };
        return JSON.parse(value);
    }

    public static getJsonBase64(key: string) {
        let localValue = this.get(key);
        if (!localValue) {
            return null;
        };
        let string = Base64.decode(localValue);
        if (string) {
            try {
                let value = JSON.parse(string);
                return value;
            } catch (error) {
                logger.warn('getJsonBase64  error ', error)
            }
        }

        return null;
    }

    public static setJsonBase64(key: string, value: any) {
        value = JSON.stringify(value);
        value = Base64.encode(value);
        this.set(key, value);
    }

    public static setBase64(key: string, value: any) {
        this.set(key, Base64.encode(value));
    }

    public static getBase64(key: string) {
        let localValue = this.get(key);
        if (!localValue) {
            return null;
        };

        let value = Base64.decode(localValue);
        return value;
    }
}
