
class Helper {
    public static copyArray(dest: Uint8Array, destOffset: number, src: Uint8Array, srcOffset: number, length: number) {
        for (let index = 0; index < length; index++) {
            dest[destOffset++] = src[srcOffset++];
        }
    }

    public static isSimpleType(type: string) {
        return !!ProtoDataType[type];
    }
}

class Constants {
    static TYPES = {
        uInt32: 0,
        sInt32: 0,
        int32: 0,
        double: 1,
        string: 2,
        message: 2,
        float: 5
    }

    /** 协议本地存储key */
    static PROTOS_STORAGE_KEY = 'omelox.client.protos'
}

enum ProtoDataType {
    uInt32 = 'uInt32',
    sInt32 = 'sInt32',
    int32 = 'int32',
    double = 'double',
    string = 'string',
    message = 'message',
    float = 'float',
}

enum ProtoOptionType {
    required = 'required',
    optional = 'optional',
    repeated = 'repeated',
}

/** 路由字典 */
class RouteDic {
    private static _ids: Object = {};
    private static _names: Object = {};

    static init(dict: any): void {
        this._names = dict || {};
        let _names = this._names;
        let _ids = this._ids;
        for (let name in _names) {
            _ids[_names[name]] = name;
        }
    }

    static getID(name: string) {
        return this._names[name];
    }
    static getName(id: number) {
        return this._ids[id];
    }
}

class ProtocolPackage {
    public static TYPE_HANDSHAKE = 1
    public static TYPE_HANDSHAKE_ACK = 2;
    public static TYPE_HEARTBEAT = 3;
    public static TYPE_DATA = 4;
    public static TYPE_KICK = 5;

    /**
     * Package protocol encode.
     *
     * Pomelo package format:
     * +------+-------------+------------------+
     * | type | body length |       body       |
     * +------+-------------+------------------+
     *
     * Head: 4bytes
     *   0: package type,
     *      1 - handshake,
     *      2 - handshake ack,
     *      3 - heartbeat,
     *      4 - data
     *      5 - kick
     *   1 - 3: big-endian body length
     * Body: body length bytes
     *
     * @param  {Number}    type   package type
     * @param  {Uint8Array} body   body content in bytes
     * @return {Uint8Array}        new byte array that contains encode result
     */
    public static encode(type: number, body?: Uint8Array) {
        var length = body ? body.length : 0;
        var buffer = new Uint8Array(Protocol.PKG_HEAD_BYTES + length);
        var index = 0;
        buffer[index++] = type & 0xff;
        buffer[index++] = (length >> 16) & 0xff;
        buffer[index++] = (length >> 8) & 0xff;
        buffer[index++] = length & 0xff;
        if (body) {
            Helper.copyArray(buffer, index, body, 0, length);
        }
        return buffer;
    }

    /**
   * Package protocol decode.
   * See encode for package format.
   *
   * @param  {Uint8Array} buffer byte array containing package content
   * @return {Object}           {type: package type, buffer: body byte array}
   */
    public static decode(buffer: Uint8Array) {
        var offset = 0;
        var bytes = new Uint8Array(buffer);
        var length = 0;
        var rs = [];
        while (offset < bytes.length) {
            var type = bytes[offset++];
            length = ((bytes[offset++]) << 16 | (bytes[offset++]) << 8 | bytes[offset++]) >>> 0;
            var body = length ? new Uint8Array(length) : null;
            Helper.copyArray(body, 0, bytes, offset, length);
            offset += length;
            rs.push({ 'type': type, 'body': body });
        }
        return rs.length === 1 ? rs[0] : rs;
    }
}

class ProtocolMessage {
    public static TYPE_REQUEST = 0;
    public static TYPE_NOTIFY = 1;
    public static TYPE_RESPONSE = 2;
    public static TYPE_PUSH = 3;

    /**
   * Message protocol encode.
   *
   * @param  {Number} id            message id
   * @param  {Number} type          message type
   * @param  {Number} compressRoute whether compress route
   * @param  {Number|String} route  route code or route string
   * @param  {Buffer} msg           message body bytes
   * @return {Buffer}               encode result
   */
    public static encode(id: number, type: number, compressRoute: number, route: any, msg: any) {
        // caculate message max length
        var idBytes = Protocol.msgHasId(type) ? Protocol.caculateMsgIdBytes(id) : 0;
        var msgLen = Protocol.MSG_FLAG_BYTES + idBytes;

        if (Protocol.msgHasRoute(type)) {
            if (compressRoute) {
                if (typeof route !== 'number') {
                    throw new Error('error flag for number route!');
                }
                msgLen += Protocol.MSG_ROUTE_CODE_BYTES;
            } else {
                msgLen += Protocol.MSG_ROUTE_LEN_BYTES;
                if (route) {
                    route = Protocol.strEncode(route);
                    if (route.length > 255) {
                        throw new Error('route maxlength is overflow');
                    }
                    msgLen += route.length;
                }
            }
        }

        if (msg) {
            msgLen += msg.length;
        }

        var buffer = new Uint8Array(msgLen);
        var offset = 0;

        // add flag
        offset = Protocol.encodeMsgFlag(type, compressRoute, buffer, offset);

        // add message id
        if (Protocol.msgHasId(type)) {
            offset = Protocol.encodeMsgId(id, buffer, offset);
        }

        // add route
        if (Protocol.msgHasRoute(type)) {
            offset = Protocol.encodeMsgRoute(compressRoute, route, buffer, offset);
        }

        // add body
        if (msg) {
            offset = Protocol.encodeMsgBody(msg, buffer, offset);
        }

        return buffer;
    };

    /**
     * Message protocol decode.
     *
     * @param  {Buffer|Uint8Array} buffer message bytes
     * @return {Object}            message object
     */
    public static decode(buffer) {
        var bytes = new Uint8Array(buffer);
        var bytesLen = bytes.length || bytes.byteLength;
        var offset = 0;
        var id = 0;
        var route = null;

        // parse flag
        var flag = bytes[offset++];
        var compressRoute = flag & Protocol.MSG_COMPRESS_ROUTE_MASK;
        var type = (flag >> 1) & Protocol.MSG_TYPE_MASK;

        // parse id
        if (Protocol.msgHasId(type)) {
            var m = parseInt(bytes[offset] as any);
            var i = 0;
            do {
                var m = parseInt(bytes[offset] as any);
                id = id + ((m & 0x7f) * Math.pow(2, (7 * i)));
                offset++;
                i++;
            } while (m >= 128);
        }

        // parse route
        if (Protocol.msgHasRoute(type)) {
            if (compressRoute) {
                route = (bytes[offset++]) << 8 | bytes[offset++];
            } else {
                var routeLen = bytes[offset++];
                if (routeLen) {
                    route = new Uint8Array(routeLen);
                    Helper.copyArray(route, 0, bytes, offset, routeLen);
                    route = Protocol.strEncode(route);
                } else {
                    route = '';
                }
                offset += routeLen;
            }
        }

        // parse body
        var bodyLen = bytesLen - offset;
        var body = new Uint8Array(bodyLen);

        Helper.copyArray(body, 0, bytes, offset, bodyLen);

        return {
            'id': id, 'type': type, 'compressRoute': compressRoute,
            'route': route, 'body': body
        };
    };
}

class Protocol {
    static PKG_HEAD_BYTES = 4;
    static MSG_FLAG_BYTES = 1;
    static MSG_ROUTE_CODE_BYTES = 2;
    static MSG_ID_MAX_BYTES = 5;
    static MSG_ROUTE_LEN_BYTES = 1;
    static MSG_ROUTE_CODE_MAX = 0xffff;
    static MSG_COMPRESS_ROUTE_MASK = 0x1;
    static MSG_TYPE_MASK = 0x7;

    /**
     * string字符串编码Uint8Array
     * @param str 字符串
     */
    public static strEncode(str: string): Uint8Array {
        var byteArray = new Uint8Array(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            if (charCode <= 0x7f) {
                codes = [charCode];
            } else if (charCode <= 0x7ff) {
                codes = [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
            } else {
                codes = [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
            }

            for (var j = 0; j < codes.length; j++) {
                byteArray[offset] = codes[j];
                ++offset;
            }
        }
        var dstBuff = new Uint8Array(offset);
        Helper.copyArray(dstBuff, 0, byteArray, 0, offset);
        return dstBuff;
    }

    /**
     * 二进制Uint8Array转string字符串
     * @param buffer 
     */
    public static strDecode(buffer: Uint8Array): string {
        var bytes = new Uint8Array(buffer);
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;
        let str = '';
        while (offset < end) {
            if (bytes[offset] < 128) {
                charCode = bytes[offset];
                offset += 1;
            } else if (bytes[offset] < 224) {
                charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else {
                charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }
            str += String.fromCharCode.apply(null, [charCode]);
        }
        return str;
    }

    public static msgHasId(type) {
        return type === ProtocolMessage.TYPE_REQUEST || type === ProtocolMessage.TYPE_RESPONSE;
    };

    public static msgHasRoute(type) {
        return type === ProtocolMessage.TYPE_REQUEST || type === ProtocolMessage.TYPE_NOTIFY ||
            type === ProtocolMessage.TYPE_PUSH;
    };

    public static caculateMsgIdBytes(id) {
        var len = 0;
        do {
            len += 1;
            id >>= 7;
        } while (id > 0);
        return len;
    };

    public static encodeMsgFlag(type, compressRoute, buffer, offset) {
        if (type !== ProtocolMessage.TYPE_REQUEST && type !== ProtocolMessage.TYPE_NOTIFY &&
            type !== ProtocolMessage.TYPE_RESPONSE && type !== ProtocolMessage.TYPE_PUSH) {
            throw new Error('unkonw message type: ' + type);
        }

        buffer[offset] = (type << 1) | (compressRoute ? 1 : 0);

        return offset + Protocol.MSG_FLAG_BYTES;
    };

    public static encodeMsgId(id, buffer, offset) {
        do {
            var tmp = id % 128;
            var next = Math.floor(id / 128);

            if (next !== 0) {
                tmp = tmp + 128;
            }
            buffer[offset++] = tmp;

            id = next;
        } while (id !== 0);

        return offset;
    };

    public static encodeMsgRoute(compressRoute, route, buffer, offset) {
        if (compressRoute) {
            if (route > Protocol.MSG_ROUTE_CODE_MAX) {
                throw new Error('route number is overflow');
            }

            buffer[offset++] = (route >> 8) & 0xff;
            buffer[offset++] = route & 0xff;
        } else {
            if (route) {
                buffer[offset++] = route.length & 0xff;
                Helper.copyArray(buffer, offset, route, 0, route.length);
                offset += route.length;
            } else {
                buffer[offset++] = 0;
            }
        }

        return offset;
    };

    public static encodeMsgBody(msg, buffer, offset) {
        Helper.copyArray(buffer, offset, msg, 0, msg.length);
        return offset + msg.length;
    };
}

class ProtobufCodec {
    static buffer = new ArrayBuffer(8);
    static float32Array = new Float32Array(ProtobufCodec.buffer);
    static float64Array = new Float64Array(ProtobufCodec.buffer);
    static uInt8Array = new Uint8Array(ProtobufCodec.buffer);

    public static encodeUInt32(d) {
        var n = parseInt(d);
        if (isNaN(n) || n < 0) {
            return null;
        }

        var result = [];
        do {
            var tmp = n % 128;
            var next = Math.floor(n / 128);

            if (next !== 0) {
                tmp = tmp + 128;
            }
            result.push(tmp);
            n = next;
        } while (n !== 0);

        return result;
    }

    public static encodeSInt32(d) {
        var n = parseInt(d);
        if (isNaN(n)) {
            return null;
        }
        n = n < 0 ? (Math.abs(n) * 2 - 1) : n * 2;

        return this.encodeUInt32(n);
    };

    public static decodeUInt32(bytes) {
        var n = 0;

        for (var i = 0; i < bytes.length; i++) {
            var m = parseInt(bytes[i]);
            n = n + ((m & 0x7f) * Math.pow(2, (7 * i)));
            if (m < 128) {
                return n;
            }
        }

        return n;
    };

    public static decodeSInt32(bytes) {
        var n = this.decodeUInt32(bytes);
        var flag = ((n % 2) === 1) ? -1 : 1;

        n = ((n % 2 + n) / 2) * flag;

        return n;
    };

    public static encodeFloat(float) {
        this.float32Array[0] = float;
        return this.uInt8Array;
    };

    public static decodeFloat(bytes, offset) {
        if (!bytes || bytes.length < (offset + 4)) {
            return null;
        }

        for (var i = 0; i < 4; i++) {
            this.uInt8Array[i] = bytes[offset + i];
        }

        return this.float32Array[0];
    };

    public static encodeDouble(double) {
        this.float64Array[0] = double;
        return this.uInt8Array.subarray(0, 8);
    };

    public static decodeDouble(bytes, offset) {
        if (!bytes || bytes.length < (offset + 8)) {
            return null;
        }

        for (var i = 0; i < 8; i++) {
            this.uInt8Array[i] = bytes[offset + i];
        }

        return this.float64Array[0];
    };

    public static encodeStr(bytes, offset, str) {
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var codes = this.encode2UTF8(code);

            for (var j = 0; j < codes.length; j++) {
                bytes[offset] = codes[j];
                offset++;
            }
        }

        return offset;
    };

    /**
     * Decode string from utf8 bytes
     */
    public static decodeStr(bytes, offset, length) {
        var array = [];
        var end = offset + length;

        while (offset < end) {
            var code = 0;

            if (bytes[offset] < 128) {
                code = bytes[offset];

                offset += 1;
            } else if (bytes[offset] < 224) {
                code = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else {
                code = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }

            array.push(code);
        }

        var str = '';
        for (var i = 0; i < array.length;) {
            str += String.fromCharCode.apply(null, array.slice(i, i + 10000));
            i += 10000;
        }

        return str;
    };

    /**
     * Return the byte length of the str use utf8
     */
    public static byteLength(str: string): number {
        if (typeof (str) !== 'string') {
            return -1;
        }

        let length = 0;
        for (let i = 0; i < str.length; i++) {
            length += this.codeLength(str.charCodeAt(i));
        }

        return length;
    }

    public static encode2UTF8(charCode) {
        if (charCode <= 0x7f) {
            return [charCode];
        } else if (charCode <= 0x7ff) {
            return [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
        } else {
            return [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
        }
    }

    public static codeLength(code) {
        if (code <= 0x7f) {
            return 1;
        } else if (code <= 0x7ff) {
            return 2;
        } else {
            return 3;
        }
    }
}

class ProtobufEncoder {
    // 对发送倒服务器的数据进行协议编码
    private static protos: any = {};

    public static init(protos: any): void {
        this.protos = protos || {};
    }

    public static encode(route: string, msg: any): Uint8Array {

        let protos: any = this.protos[route];

        if (!protos) return null;

        //Check msg
        if (!this.checkMsg(msg, protos)) {
            return null;
        }

        //Set the length of the buffer 2 times bigger to prevent overflow
        let length = ProtobufCodec.byteLength(JSON.stringify(msg));

        //Init buffer and offset
        var buffer = new ArrayBuffer(length);
        var uInt8Array = new Uint8Array(buffer);
        var offset = 0;

        if (!!protos) {
            offset = this.encodeMsg(uInt8Array, offset, protos, msg);
            if (offset > 0) {
                return uInt8Array.subarray(0, offset);
            }
        }

        return null;
    }

    private static checkMsg(msg, protos) {
        if (!protos) {
            return false;
        }

        for (let name in protos) {
            let proto = protos[name];

            //All required element must exist
            switch (proto.option) {
                case ProtoOptionType.required:
                    if (typeof (msg[name]) === 'undefined') {
                        console.warn('no property exist for required! name: %j, proto: %j, msg: %j', name, proto, msg);
                        return false;
                    }
                case ProtoOptionType.optional:
                    if (typeof (msg[name]) !== 'undefined') {
                        let message = protos.__messages[proto.type] || this.protos['message ' + proto.type];
                        if (!!message && !this.checkMsg(msg[name], message)) {
                            console.warn('inner proto error! name: %j, proto: %j, msg: %j', name, proto, msg);
                            return false;
                        }
                    }
                    break;
                case ProtoOptionType.repeated:
                    //Check nest message in repeated elements
                    let message = protos.__messages[proto.type] || this.protos['message ' + proto.type];
                    if (!!msg[name] && !!message) {
                        for (let i = 0; i < msg[name].length; i++) {
                            if (!this.checkMsg(msg[name][i], message)) {
                                return false;
                            }
                        }
                    }
                    break;
            }
        }

        return true;
    }

    private static encodeMsg(buffer: Uint8Array, offset: number, protos: any, msg: any) {
        for (var name in msg) {
            if (!!protos[name]) {
                var proto = protos[name];

                switch (proto.option) {
                    case ProtoOptionType.required:
                    case ProtoOptionType.optional:
                        offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
                        offset = this.encodeProp(msg[name], proto.type, offset, buffer, protos);
                        break;
                    case ProtoOptionType.repeated:
                        if (msg[name].length > 0) {
                            offset = this.encodeArray(msg[name], proto, offset, buffer, protos);
                        }
                        break;
                }
            }
        }

        return offset;
    }

    private static encodeProp(value: any, type: string, offset: number, buffer: Uint8Array, protos?: any) {
        switch (type) {
            case ProtoDataType.uInt32:
                offset = this.writeBytes(buffer, offset, ProtobufCodec.encodeUInt32(value));
                break;
            case ProtoDataType.int32:
            case ProtoDataType.sInt32:
                offset = this.writeBytes(buffer, offset, ProtobufCodec.encodeSInt32(value));
                break;
            case ProtoDataType.float:
                this.writeBytes(buffer, offset, ProtobufCodec.encodeFloat(value));
                offset += 4;
                break;
            case ProtoDataType.double:
                this.writeBytes(buffer, offset, ProtobufCodec.encodeDouble(value));
                offset += 8;
                break;
            case ProtoDataType.string:
                var length = ProtobufCodec.byteLength(value);
                //Encode length
                offset = this.writeBytes(buffer, offset, ProtobufCodec.encodeUInt32(length));
                //write string
                ProtobufCodec.encodeStr(buffer, offset, value);
                offset += length;
                break;
            default:
                var message = protos.__messages[type] || this.protos['message ' + type];
                if (!!message) {
                    //Use a tmp buffer to build an internal msg
                    let tmpBuffer = new ArrayBuffer(ProtobufCodec.byteLength(JSON.stringify(value)) * 2);
                    let length = 0;
                    length = this.encodeMsg(tmpBuffer as any, length, message, value);
                    //Encode length
                    offset = this.writeBytes(buffer, offset, ProtobufCodec.encodeUInt32(length));
                    //contact the object
                    for (var i = 0; i < length; i++) {
                        buffer[offset] = tmpBuffer[i];
                        offset++;
                    }
                }
                break;
        }

        return offset;
    }

    /**
     * Encode reapeated properties, simple msg and object are decode differented
     */
    private static encodeArray(array: Array<any>, proto: any, offset: number, buffer: Uint8Array, protos: any) {
        var i = 0;

        if (Helper.isSimpleType(proto.type)) {
            offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
            offset = this.writeBytes(buffer, offset, ProtobufCodec.encodeUInt32(array.length));
            for (i = 0; i < array.length; i++) {
                offset = this.encodeProp(array[i], proto.type, offset, buffer);
            }
        } else {
            for (i = 0; i < array.length; i++) {
                offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
                offset = this.encodeProp(array[i], proto.type, offset, buffer, protos);
            }
        }

        return offset;
    }


    private static writeBytes(buffer: Uint8Array, offset: number, bytes) {
        for (var i = 0; i < bytes.length; i++, offset++) {
            buffer[offset] = bytes[i];
        }

        return offset;
    }

    private static encodeTag(type: number, tag: number) {
        let value: number = Constants.TYPES[type] || 2;
        return ProtobufCodec.encodeUInt32((tag << 3) | value);
    }
}

class ProtobufDecoder {
    // 解析来自服务器的协议数据
    private static protos: any = {};

    static buffer: Uint8Array;
    static offset: number = 0;

    public static init(protos: any): void {
        this.protos = protos || {};
    }

    public static decode(route: string, buf: Uint8Array) {
        let protos = this.protos[route];

        this.buffer = buf;
        this.offset = 0;

        if (!!protos) {
            return this.decodeMsg({}, protos, this.buffer.length);
        }

        return null;
    }

    private static decodeMsg(msg, protos, length) {
        while (this.offset < length) {
            let head = this.getHead();
            let type = head.type;
            let tag = head.tag;
            let name = protos.__tags[tag];

            switch (protos[name].option) {
                case ProtoOptionType.optional:
                case ProtoOptionType.required:
                    msg[name] = this.decodeProp(protos[name].type, protos);
                    break;
                case ProtoOptionType.repeated:
                    if (!msg[name]) {
                        msg[name] = [];
                    }
                    this.decodeArray(msg[name], protos[name].type, protos);
                    break;
            }
        }

        return msg;
    }

    /**
   * Get property head from protobuf
   */
    private static getHead() {
        var tag = ProtobufCodec.decodeUInt32(this.getBytes());

        return {
            type: tag & 0x7,
            tag: tag >> 3
        };
    }

    /**
   * Get tag head without move the offset
   */
    private static peekHead() {
        var tag = ProtobufCodec.decodeUInt32(this.peekBytes());

        return {
            type: tag & 0x7,
            tag: tag >> 3
        };
    }

    private static decodeProp(type: string, protos?: any) {
        switch (type) {
            case ProtoDataType.uInt32:
                return ProtobufCodec.decodeUInt32(this.getBytes());
            case ProtoDataType.int32:
            case ProtoDataType.sInt32:
                return ProtobufCodec.decodeSInt32(this.getBytes());
            case ProtoDataType.float:
                let float = ProtobufCodec.decodeFloat(this.buffer, this.offset);
                this.offset += 4;
                return float;
            case ProtoDataType.double:
                let double = ProtobufCodec.decodeDouble(this.buffer, this.offset);
                this.offset += 8;
                return double;
            case ProtoDataType.string:
                let length = ProtobufCodec.decodeUInt32(this.getBytes());
                let str = ProtobufCodec.decodeStr(this.buffer, this.offset, length);
                this.offset += length;
                return str;
            default:
                let message = protos && (protos.__messages[type] || this.protos['message ' + type]);
                if (!!message) {
                    let length = ProtobufCodec.decodeUInt32(this.getBytes());
                    let msg = {};
                    this.decodeMsg(msg, message, this.offset + length);
                    return msg;
                }
                break;
        }
    }

    private static decodeArray(array, type, protos) {
        if (Helper.isSimpleType(type)) {
            let length = ProtobufCodec.decodeUInt32(this.getBytes());
            for (let i = 0; i < length; i++) {
                array.push(this.decodeProp(type));
            }
        } else {
            array.push(this.decodeProp(type, protos));
        }
    }

    private static getBytes(flag?: boolean) {
        let bytes = [];
        let pos = this.offset;
        flag = flag || false;

        let b;

        do {
            b = this.buffer[pos];
            bytes.push(b);
            pos++;
        } while (b >= 128);

        if (!flag) {
            this.offset = pos;
        }
        return bytes;
    }

    private static peekBytes() {
        return this.getBytes(true);
    }
}

class Protobuf {
    public static init(opts) {
        //On the serverside, use serverProtos to encode messages send to client
        ProtobufEncoder.init(opts.encoderProtos);

        //On the serverside, user clientProtos to decode messages receive from clients
        ProtobufDecoder.init(opts.decoderProtos);
    }

    public static encode(key, msg) {
        return ProtobufEncoder.encode(key, msg);
    }

    public static decode(key, msg) {
        return ProtobufDecoder.decode(key, msg);
    }
}

interface Subscription {
    callback: Function;
    target: any;
}

class EventEmitter {
    private events: Map<string, Subscription[]> = new Map<string, Subscription[]>();
    private onceEvents: Map<string, Subscription[]> = new Map<string, Subscription[]>();

    /**
     * 监听事件
     * @param name 事件名
     * @param callback 回调
     * @param target 订阅对象
     */
    public on(name: string, callback: Function, target?: any) {
        if (!this.events.has(name)) {
            this.events.set(name, []);
        }
        this.events.get(name).push({ callback, target });
    }

    /**
     * 监听事件（一次性）
     * @param name 事件名
     * @param callback 回调
     * @param target 订阅对象
     */
    public once(name: string, callback: Function, target?: any) {
        if (!this.onceEvents.has(name)) {
            this.onceEvents.set(name, []);
        }
        this.onceEvents.get(name).push({ callback, target });
    }

    /**
     * 取消监听事件
     * @param name 事件名
     * @param callback 回调
     * @param target 订阅对象
     */
    public off(name: string, callback: Function, target?: any) {
        if (this.events.has(name)) {
            const subscriptions = this.events.get(name);
            for (let i = 0; i < subscriptions.length; i++) {
                if (subscriptions[i].target === target &&
                    (subscriptions[i].callback === callback || subscriptions[i].callback.toString() === callback.toString())) {
                    subscriptions.splice(i, 1);
                    break;
                }
            }
        }
        // 一次性事件
        if (this.onceEvents.has(name)) {
            const subscriptions = this.onceEvents.get(name);
            for (let i = 0; i < subscriptions.length; i++) {
                if (subscriptions[i].target === target &&
                    (subscriptions[i].callback === callback || subscriptions[i].callback.toString() === callback.toString())) {
                    subscriptions.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * 发射事件
     * @param name 事件名
     * @param args 参数
     */
    public emit(name: string, ...args: any[]) {
        if (this.events.has(name)) {
            const subscriptions = this.events.get(name);
            for (let i = 0; i < subscriptions.length; i++) {
                subscriptions[i].callback.apply(subscriptions[i].target, args);
            }
        }
        // 一次性事件
        if (this.onceEvents.has(name)) {
            let subscriptions = this.onceEvents.get(name);
            for (let i = 0; i < subscriptions.length; i++) {
                subscriptions[i].callback.apply(subscriptions[i].target, args);
            }
            subscriptions.length = 0;
        }
    }

    /**
     * 移除事件
     * @param name 事件名
     */
    public remove(name: string) {
        if (this.events.has(name)) {
            this.events.delete(name);
        }
        if (this.onceEvents.has(name)) {
            this.onceEvents.delete(name);
        }
    }

    /**
     * 移除所有事件
     */
    public removeAll() {
        this.events.clear();
        this.onceEvents.clear();
    }
}

export interface OmeloxCocosParam {
    wsUrl?: string;
    host?: string;
    port?: number;
    /** 是否自动重连 */
    reconnect: boolean;
    encode?: any;
    decode?: any;
    user?: string;
    encrypt?: boolean;
    handshakeCallback?: any;
    maxReconnectAttempts?: number;
    localStorage: any;
}

export class OmeloxCocos extends EventEmitter {
    static JS_WS_CLIENT_TYPE: string = 'cocos-websocket';
    static JS_WS_CLIENT_VERSION = '0.0.1';

    rsa = null;
    disconnectCb = null;

    RES_OK = 200;
    RES_FAIL = 500;
    RES_OLD_CLIENT = 501;

    socket = null;
    reqId = 0;
    callbacks = {};
    handlers = {};
    //Map from request id to route
    routeMap = {};
    dict = {};    // route string to code
    abbrs = {};   // code to route string
    serverProtos = {};
    clientProtos = {};
    protoVersion = 0;

    heartbeatInterval = 0;
    heartbeatTimeout = 0;
    nextHeartbeatTimeout = 0;
    gapThreshold = 100;   // heartbeat gap threashold
    heartbeatId = null;
    heartbeatTimeoutId = null;
    handshakeCallback = null;

    decode: Function = null;
    encode: Function = null;

    reconnect = false;
    reconncetTimer = null;
    reconnectUrl = null;
    reconnectAttempts = 0;
    reconnectionDelay = 2000;
    static DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;

    useCrypto;

    handshakeBuffer = {
        'sys': {
            type: OmeloxCocos.JS_WS_CLIENT_TYPE,
            version: OmeloxCocos.JS_WS_CLIENT_VERSION,
            rsa: {},
            protoVersion: 0,
        },
        'user': {
        }
    };

    localStorage: any = null;

    initCallback = null;

    constructor() {
        super();
        this.handlers[ProtocolPackage.TYPE_HANDSHAKE] = this.handshake.bind(this);
        this.handlers[ProtocolPackage.TYPE_HEARTBEAT] = this.heartbeat.bind(this);
        this.handlers[ProtocolPackage.TYPE_DATA] = this.onData.bind(this);
        this.handlers[ProtocolPackage.TYPE_KICK] = this.onKick.bind(this);
    }

    /** 连接的服务器 */
    public connect(params: OmeloxCocosParam, cb: Function) {
        this.initCallback = cb;
        this.localStorage = params.localStorage;
        var host = params.host;
        var port = params.port;

        this.encode = params.encode || this.defaultEncode;
        this.decode = params.decode || this.defaultDecode;

        var url = null;
        if (params.wsUrl) {
            url = params.wsUrl;
        } else {
            url = 'ws://' + host;
            if (port) {
                url += ':' + port;
            }
        }

        this.handshakeBuffer.user = params.user;
        if (params.encrypt && this.rsa) {
            this.useCrypto = true;
            this.rsa.generate(1024, "10001");
            var data = {
                rsa_n: this.rsa.n.toString(16),
                rsa_e: this.rsa.e
            }
            this.handshakeBuffer.sys.rsa = data;
        }
        this.handshakeCallback = params.handshakeCallback;
        this.connectImpl(params, url, cb);
    }

    /** 断开连接 */
    public disconnect(cb?: Function) {
        this.disconnectCb = cb;
        if (this.socket) {
            if (this.socket.disconnect) this.socket.disconnect();
            if (this.socket.close) this.socket.close();
            console.info('disconnect');
            this.socket = null;
        }

        if (this.heartbeatId) {
            clearTimeout(this.heartbeatId);
            this.heartbeatId = null;
        }
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = null;
        }
    }

    /** 请求服务，route为服务端的路由，格式为"..", msg为请求的内容，cb会响应回来后的回调 */
    public request(route, msg, cb) {
        if (arguments.length === 2 && typeof msg === 'function') {
            cb = msg;
            msg = {};
        } else {
            msg = msg || {};
        }
        route = route || msg.route;
        if (!route) {
            return;
        }

        this.reqId++;
        this.sendMessage(this.reqId, route, msg);

        this.callbacks[this.reqId] = cb;
        this.routeMap[this.reqId] = route;
    };

    /** 发送notify，不需要服务器回响应的 */
    public notify(route, msg) {
        msg = msg || {};
        this.sendMessage(0, route, msg);
    };

    private connectImpl(params, url, cb) {
        console.info('connect to ' + url);

        params = params || {};

        this.reconnectUrl = url;
        //Add protobuf version
        if (this.localStorage && this.localStorage.getItem(Constants.PROTOS_STORAGE_KEY) && this.protoVersion === 0) {
            var protos = JSON.parse(this.localStorage.getItem(Constants.PROTOS_STORAGE_KEY));

            this.protoVersion = protos.version || 0;
            this.serverProtos = protos.server || {};
            this.clientProtos = protos.client || {};

            Protobuf.init({ encoderProtos: this.clientProtos, decoderProtos: this.serverProtos });
        }
        //Set protoversion
        this.handshakeBuffer.sys.protoVersion = this.protoVersion;

        this.socket = new WebSocket(url);
        this.socket.binaryType = 'arraybuffer';
        this.socket.onopen = (event) => {
            this.reset();
            let obj = ProtocolPackage.encode(ProtocolPackage.TYPE_HANDSHAKE, Protocol.strEncode(JSON.stringify(this.handshakeBuffer)));
            this.send(obj);
        };

        this.socket.onmessage = (event) => {
            this.processPackage(ProtocolPackage.decode(event.data));
            // new package arrived, update the heartbeat timeout
            if (this.heartbeatTimeout) {
                this.nextHeartbeatTimeout = Date.now() + this.heartbeatTimeout;
            }
        };
        this.socket.onerror = (event) => {
            this.emit('io-error', "网络错误");
            console.error('socket error: ', event);
        };

        let maxReconnectAttempts = params.maxReconnectAttempts || OmeloxCocos.DEFAULT_MAX_RECONNECT_ATTEMPTS;
        this.socket.onclose = (event) => {
            console.error('socket close: ', event);
            if (!!params.reconnect) {
                if (this.reconnectAttempts < maxReconnectAttempts) {
                    this.emit('reconnecting', "重连中");
                    this.reconnect = true;
                    this.reconnectAttempts++;
                    this.reconncetTimer = setTimeout(function () {
                        this.connectImpl(this.params, this.reconnectUrl, cb);
                    }, this.reconnectionDelay);
                    this.reconnectionDelay *= 2;
                } else {
                    this.emit('reconnectfail', "重连失败");
                }

            } else {
                this.emit('disconnect', "网络断开");
            }

            this.socket = null;
            this.disconnectCb && this.disconnectCb();
            this.disconnectCb = null;
        };
    }

    private reset() {
        // reconnect = false;
        this.reconnectionDelay = 1000 * 2;
        this.reconnectAttempts = 0;
        clearTimeout(this.reconncetTimer);
    }

    private sendMessage(reqId, route, msg) {
        if (this.useCrypto && this.rsa) {
            msg = JSON.stringify(msg);
            let sig = this.rsa.signString(msg, "sha256");
            msg = JSON.parse(msg);
            msg['__crypto__'] = sig;
        }

        if (this.encode) {
            msg = this.encode(reqId, route, msg);
        }

        let packet = ProtocolPackage.encode(ProtocolPackage.TYPE_DATA, msg);
        this.send(packet);
    }

    private send(packet) {
        if (this.socket !== null) {
            this.socket.send(packet.buffer);
        }
    }

    private processPackage(msgs) {
        if (Array.isArray(msgs)) {
            for (var i = 0; i < msgs.length; i++) {
                var msg = msgs[i];
                this.handlers[msg.type](msg.body);
            }
        } else {
            this.handlers[msgs.type](msgs.body);
        }
    };

    private processMessage(msg) {
        if (!msg.id) {
            // server push message
            this.emit(msg.route, msg.body);
            return;
        }

        //if have a id then find the callback function with the request
        var cb = this.callbacks[msg.id];

        delete this.callbacks[msg.id];
        if (typeof cb !== 'function') {
            return;
        }

        cb(msg.body);
        return;
    };

    private handshake(data) {
        data = JSON.parse(Protocol.strDecode(data));
        if (data.code === this.RES_OLD_CLIENT) {
            this.emit('io-error', 'client version not fullfill');
            return;
        }

        if (data.code !== this.RES_OK) {
            this.emit('io-error', 'handshake fail');
            return;
        }

        this.handshakeInit(data);

        var obj = ProtocolPackage.encode(ProtocolPackage.TYPE_HANDSHAKE_ACK);
        this.send(obj);

        if (!!this.reconnect) {
            this.emit('reconnected', "重连成功");
            this.reconnect = false;
        }

        if (this.initCallback) {
            this.initCallback(this.socket);
            this.initCallback = null;
        }
    }

    private handshakeInit(data) {
        if (data.sys && data.sys.heartbeat) {
            this.heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
            this.heartbeatTimeout = this.heartbeatInterval * 2;        // max heartbeat timeout
        } else {
            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
        }

        this.initData(data);

        if (typeof this.handshakeCallback === 'function') {
            this.handshakeCallback(data.user);
        }
    }

    private heartbeat(data) {
        if (!this.heartbeatInterval) {
            // no heartbeat
            return;
        }

        var obj = ProtocolPackage.encode(ProtocolPackage.TYPE_HEARTBEAT);
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = null;
        }

        if (this.heartbeatId) {
            // already in a heartbeat interval
            return;
        }
        this.heartbeatId = setTimeout(() => {
            this.heartbeatId = null;
            this.send(obj);

            this.nextHeartbeatTimeout = Date.now() + this.heartbeatTimeout;
            this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb, this.heartbeatTimeout);
        }, this.heartbeatInterval);
    }

    private heartbeatTimeoutCb() {
        var gap = this.nextHeartbeatTimeout - Date.now();
        if (gap > this.gapThreshold) {
            this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb, gap);
        } else {
            console.error('server heartbeat timeout');
            this.emit('disconnect', '心跳超时');
            this.disconnect();
        }
    }

    private onData(data) {
        var msg = data;
        if (this.decode) {
            msg = this.decode(msg);
        }
        this.processMessage(msg);
    }

    private onKick(data) {
        data = JSON.parse(Protocol.strDecode(data));
        this.emit('onKick', data);
    }

    private initData(data) {
        if (!data || !data.sys) {
            return;
        }
        this.dict = data.sys.dict;
        var protos = data.sys.protos;

        //Init compress dict
        if (this.dict) {
            this.dict = this.dict;
            this.abbrs = {};

            for (var route in this.dict) {
                this.abbrs[this.dict[route]] = route;
            }
        }

        //Init protobuf protos
        if (protos) {
            this.protoVersion = protos.version || 0;
            this.serverProtos = protos.server || {};
            this.clientProtos = protos.client || {};

            //Save protobuf protos to localStorage
            this.localStorage.setItem(Constants.PROTOS_STORAGE_KEY, JSON.stringify(protos));
            Protobuf.init({ encoderProtos: protos.client, decoderProtos: protos.server });
        }
    }

    defaultDecode(data) {
        //probuff decode
        var msg = ProtocolMessage.decode(data);

        if (msg.id > 0) {
            msg.route = this.routeMap[msg.id];
            delete this.routeMap[msg.id];
            if (!msg.route) {
                return;
            }
        }

        msg.body = this.deCompose(msg);
        return msg;
    };

    defaultEncode(reqId, route, msg) {
        var type = reqId ? ProtocolMessage.TYPE_REQUEST : ProtocolMessage.TYPE_NOTIFY;

        //compress message by protobuf
        if (this.clientProtos[route]) {
            msg = Protobuf.encode(route, msg);
        } else {
            msg = Protocol.strEncode(JSON.stringify(msg));
        }

        var compressRoute = 0;
        if (this.dict && this.dict[route]) {
            route = this.dict[route];
            compressRoute = 1;
        }

        return ProtocolMessage.encode(reqId, type, compressRoute, route, msg);
    }

    private deCompose(msg) {
        let route = msg.route;

        //Decompose route from dict
        if (msg.compressRoute) {
            if (!this.abbrs[route]) {
                return {};
            }
            route = msg.route = this.abbrs[route];
        }
        if (this.serverProtos[route]) {
            return Protobuf.decode(route, msg.body);
        }

        return JSON.parse(Protocol.strDecode(msg.body));
    }


}

