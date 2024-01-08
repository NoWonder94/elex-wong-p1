import * as crypto from 'crypto';

export class EncryptHelper {
    /**
     * 生成sha1
     * @param {string} content 加密文本
     * @param {string} key 加密密钥
     */
    static hmac_sha1(content, key) {
        const buf = crypto.randomBytes(16);
        // 密钥加密；
        key = key || buf.toString('hex');
        // 定义加密方式
        const hmac = crypto.createHmac('sha1', key);
        hmac.update(content);
        const sign = hmac.digest().toString('base64');
        return {
            key,
            sign: sign.toUpperCase()
        };
    }

    // 加密
    static aes_encode(content, key, iv) {
        let sign = '';
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        sign += cipher.update(content, 'utf8', 'hex');
        sign += cipher.final('hex');
        return sign;
    }

    // 解密
    static aes_decode(content, key, iv) {
        let src = '';
        const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        src += cipher.update(content, 'hex', 'utf8');
        src += cipher.final('utf8');
        return src;
    }

    static md5(content) {
        return crypto.createHash('md5').update(content, 'utf8').digest('hex');
    }

    static sha1(data: string) {
        const _sha1 = crypto.createHash('sha1');
        _sha1.update(data);
        return _sha1.digest('hex');
    }

    base64Encode(data: string) {
        const buf = Buffer.from(data);
        const base64 = buf.toString('base64');
        return base64;
    }

    base64Decode(base64Data: string) {
        const buf = Buffer.from(base64Data, 'base64');
        return buf;
    }
}