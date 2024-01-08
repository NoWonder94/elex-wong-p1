/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import {Airdrop, BaseItem, Item} from "./item.interface";
/**
 * Router Definition
 */
export const itemsRouter = express.Router();
/**
 * Controller Definitions
 */
import {utils} from "../common/utils";
import {cacheMemory} from "../common/cache";

itemsRouter.get("/nonce/:address/:chain", async (req: Request, res: Response) => {
	const address = req.params.address;
	const chain = req.params.chain;
	console.log(new Date(),address,chain)
	try {
		if(!utils.isValidAddr(address)){
			res.status(200).send("Invalid address!");
			return;
		}
		const nonce = utils.genNonce();
		cacheMemory.set(address,nonce);
		if (nonce) {
			return res.status(200).send(nonce);
		}
		return res.status(200).send("Get nonce failed!");
	} catch (e) {
		const err = typeof e == 'string'?e:e.message;
		console.log("item router: ",e);
		return res.status(200).send(err);
	}
});

// POST items
itemsRouter.post("/register", async (req: Request, res: Response) => {
	try {
		const item: Item = req.body;
		if(!utils.isValidAddr(item.address)){
			res.status(200).send("Invalid address!");
			return;
		}
		if(!utils.isValidPassword(item.password)){
			res.status(200).send("Invalid password!");
			return;
		}
		if(!item.sig || !item.nonce){
			res.status(200).send("Nonce and sig is require!");
			return;
		}
		if(!utils.verifySig(item.address,item.sig,item.nonce)){
			res.status(200).send("Invalid sig!");
			return;
		}
		if (!cacheMemory.has(item.address) || cacheMemory.has(item.address) && cacheMemory.get(item.address) != item.nonce){
			res.status(200).send("Invalid nonce!");
			return;
		}

		const rest:any = await ItemService.find(item.address,item.chain);
		if(rest){
			res.status(200).send("Already Register!");
			return;
		}

		const rest1:any = await ItemService.create(item);
		cacheMemory.delete(item.address);
		res.status(200).send(rest1);
	} catch (e) {
		res.status(200).send(e.message);
	}
});

//
itemsRouter.post("/register2", async (req: Request, res: Response) => {
	try {
		const airdrop:Airdrop = req.body;

		console.info("---> register params: ",JSON.stringify(airdrop));

		if(!airdrop.refercode){
			res.status(200).send("Refer code is required!");
			return;
		}

		if(!airdrop.forwarding){
			res.status(200).send("Forward emaill address is required!");
			return;
		}
		if(!airdrop.address){
			res.status(200).send("Wallet address is required!");
			return;
		}
		if(airdrop.forwarding){
			if(airdrop.forwarding.endsWith("emails.com")){
				res.status(200).send("Forward email address can not be emails.com !");
				return;
			}
			const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if(!pattern.test(airdrop.forwarding)){
				res.status(200).send("Invalid forward email address !");
				return;
			}
		}
		if(!utils.isValidAddr(airdrop.address)){
			res.status(200).send("Invalid address!");
			return;
		}
		if(!utils.verifySig(airdrop.address,airdrop.sig,airdrop.nonce)){
			res.status(200).send("Invalid sig!");
			return;
		}
		if (!cacheMemory.has(airdrop.address) || cacheMemory.has(airdrop.address) && cacheMemory.get(airdrop.address) != airdrop.nonce){
			res.status(200).send("Invalid nonce!");
			return;
		}

		const rest:any = await ItemService.find(airdrop.address,airdrop.chain);
		if(rest){
			res.status(200).send("Already Register!");
			return;
		}


		 const ip = getIpClient(req);
		 console.log("ip",ip)
		const rest1:any = await ItemService.create2(airdrop,ip);
		cacheMemory.delete(airdrop.address);
		res.status(200).send(rest1);
	} catch (e) {
		const err = typeof e == 'string'?e:e.message;
		console.log("---> register error: ",err);
		res.status(200).send(err);
	}
});

function getIpClient(req: Request) {
	const _ip: any = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress || '';
	const m = _ip.match(/\d+.\d+.\d+.\d+/);
	return m ? m.join(".") : null;

}

//
itemsRouter.post("/accountInfo", async (req: Request, res: Response) => {
	try {
		const airdrop:Airdrop = req.body;

		console.info("------> account info params: ",JSON.stringify(airdrop));

		if(!airdrop.address){
			res.status(200).send("Wallet address is required!");
			return;
		}
		if(!utils.isValidAddr(airdrop.address)){
			res.status(200).send("Invalid address!");
			return;
		}
		if(!utils.verifySig(airdrop.address,airdrop.sig,airdrop.nonce)){
			res.status(200).send("Invalid sig!");
			return;
		}
		if (!cacheMemory.has(airdrop.address) || cacheMemory.has(airdrop.address) && cacheMemory.get(airdrop.address) != airdrop.nonce){
			res.status(200).send("Invalid nonce!");
			return;
		}

		const baseAir:Airdrop = await ItemService.findAirdrop(airdrop.address,airdrop.chain);
		cacheMemory.delete(airdrop.address);
		res.status(200).send(baseAir);
	} catch (e) {
		console.log("account info err:",e)
		const err = typeof e == 'string'?e:e.message;
		res.status(200).send(err);
	}
});
