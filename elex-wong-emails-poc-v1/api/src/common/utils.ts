import { isValidAddress,addHexPrefix,hashPersonalMessage } from 'ethereumjs-util'
import { v4 as uuidv4 } from 'uuid';
import * as sigUtil from '@metamask/eth-sig-util';

export const utils = {

    verifySig : (address:string,sig:string,msg:string): boolean =>{
        console.log(address,sig,msg,"verify sig");

	const pubAddress = sigUtil.recoverPersonalSignature({data:addHexPrefix(msg),signature:sig});
        return address.toLowerCase() === pubAddress.toLowerCase();
    },

    isValidAddr : (address: string) :boolean =>{
        return isValidAddress(address);
    },

    genNonce : () :string =>{
        const msg = hashPersonalMessage(Buffer.from(uuidv4())).toString("hex");
	console.log("msg:",msg);
	return msg;
    },

    isValidPassword: (str:string): boolean =>{
        return str && str.length >= 8;
    }
}
