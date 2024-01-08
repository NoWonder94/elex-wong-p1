import * as sigUtil from '@metamask/eth-sig-util';
import { addHexPrefix, hashPersonalMessage } from 'ethereumjs-util';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const utils = {
    verifySig: (address: string, sig: string, msg: string): boolean => {
        console.log(address, sig, msg, "verify sig");

        const pubAddress = sigUtil.recoverPersonalSignature({ data: addHexPrefix(msg), signature: sig });
        return address.toLowerCase() === pubAddress.toLowerCase();
    },

    genNonce: (): string => {
        const msg = hashPersonalMessage(Buffer.from(uuidv4())).toString("hex");
        console.log("msg:", msg);
        return msg;
    },

    isValidPassword: (str: string): boolean => {
        return str && str.length >= 8;
    }
}

export const getClientIPAddress = (req: Request) => {
    const _ip: any = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress || '';
    const m = _ip.match(/\d+.\d+.\d+.\d+/);
    return m ? m.join(".") : null;
}