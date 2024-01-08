item.interface.ts                                                                                   0000644 0000000 0000000 00000002412 14236224600 013017  0                                                                                                    ustar   root                            root                                                                                                                                                                                                                   export interface BaseItem {
    address: string;
    password?: string;
    email?: string;
}

export interface Item extends BaseItem {
    nonce?: string;
    sig?: string
    chain?:any
}

/**
 * update forwardings set forwarding=*''* where address=*''*
 * insert into airdrop (id, username, level1, level2, count1,count2,emls_total) values(10000, 'beagle@emails.com','','',0,0,1000);
 update airdrop set refercode=hex(id) where username= 'beagle@emails.com';
 update airdrop set level1 = *input referal* where username='beagle@emails.com';
 UPDATE airdrop SET airdrop.level2 = (select level1 from airdrop t2 where t2.refercode=*input referral* );
 update airdrop set count1=count1+1, emls_total = emls_total + 300  where refercode = (select t2.level1 from airdrop t2 where t2.username=*''*);
 update airdrop set count2=count2 +1, emls_total = emls_total + 100  where refercode = (select t2.level2 from airdrop t2 where t2.username=*''*);
 */
export interface BaseAirdrop {
    id?: number
    username: string
    level1?: string
    level2?: string
    count1?: number
    count2?: number
    emls_total?: number

    refercode?: string
    forwarding?: string
}

export interface Airdrop extends BaseAirdrop {
    address?: string
    nonce?: string;
    sig?: string;
    chain?:any
}                                                                                                                                                                                                                                                      items.router.ts                                                                                     0000644 0000000 0000000 00000007575 14236451036 012606  0                                                                                                    ustar   root                            root                                                                                                                                                                                                                   /**
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


		if(!airdrop.refercode){
			res.status(200).send("Refer code is required!");
			return;
		}
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

		const rest:any = await ItemService.find(airdrop.address,airdrop.chain);
		if(rest){
			res.status(200).send("Already Register!");
			return;
		}

		const rest1:any = await ItemService.create2(airdrop);
		cacheMemory.delete(airdrop.address);
		res.status(200).send(rest1);
	} catch (e) {
		res.status(200).send(e.message);
	}
});


//
itemsRouter.post("/accountInfo", async (req: Request, res: Response) => {
	try {
		const airdrop:Airdrop = req.body;

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
		res.status(200).send(e.message);
	}
});
                                                                                                                                   items.service.ts                                                                                    0000644 0000000 0000000 00000016552 14236452207 012722  0                                                                                                    ustar   root                            root                                                                                                                                                                                                                   import {format} from 'date-fns';
import spawnAsync from '@expo/spawn-async';

/**
 * Data Model Interfaces
 */
import {Airdrop, BaseAirdrop, BaseItem, Item} from "./item.interface";
import {dbpool, promisePool} from "../db";
import {utils} from "../common/utils";
import {PoolConnection} from "mysql2/promise";

/**
 * Service Methods
 */

const hotFix = ""

const convertChain = (chain: string) => {
    let hotFix = "";
    if (chain == "0x1") {
        hotFix = "eth.emails.com"
    } else if (chain == "0x38") {
        hotFix = "bsc.emails.com"
    } else if (chain == "0x14") {
        hotFix = "esc.emails.com"
    }

    return hotFix;
}
export const find = async (address: string, chain?: string): Promise<any> => {
    if (!utils.isValidAddr(address)) {
        return Promise.reject("Invalid address!")
    }
    const hotFix = convertChain(chain);
    if (!hotFix) {
        return Promise.reject("Unknown chain network!");
    }
    return new Promise((resolve, reject) => {
        dbpool.query(`SELECT * FROM mailbox where username='${address}@${hotFix}'`, function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                reject(err)
            } else {
                if (rows && rows.length > 0) {
                    resolve(rows);
                } else {
                    resolve(false)
                }
            }
        })
    })
};

export const findAirdrop = async (address: string, chain?: string): Promise<BaseAirdrop|undefined> => {
    if (!utils.isValidAddr(address)) {
        return Promise.reject("Invalid address!")
    }
    const hotFix = convertChain(chain);
    if (!hotFix) {
        return Promise.reject("Unknown chain network!");
    }
    return new Promise((resolve, reject) => {
        dbpool.query(`SELECT * FROM airdrop where username='${address}@${hotFix}'`, function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                reject(err)
            } else {
                if (rows && rows.length > 0) {
                    resolve(rows[0]);
                } else {
                    resolve(undefined)
                }
            }
        })
    })
};

export const create = async (newItem: Item): Promise<any> => {
    //doveadm pw -s 'ssha512' -p 'hu124124'
    let resultPromise = spawnAsync('doveadm', ['pw', '-s', 'ssha512', '-p', newItem.password]);
    let spawnedChildProcess = resultPromise.child;
    let {
        pid,
        stdout,
        stderr,
        status,
        signal,
    } = await resultPromise;

    console.log(stdout, "doveadm::");
    const passwordSHA512 = stdout;
    return new Promise((resolve, reject) => {
        const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const hotFix = convertChain(newItem.chain);
        if (!hotFix) {
            reject("Unknown chain network!");
            return;
        }

        const email = `${newItem.address.toLowerCase()}@${hotFix}`;
        // dbpool.beginTransaction();
        dbpool.query(`INSERT INTO mailbox (username, password, name,storagebasedirectory,storagenode, maildir, quota, domain, active, passwordlastchange, created)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [email, passwordSHA512, newItem.address,
                '/var/vmail', 'vmail1', `${hotFix}/t/e/s/app-${format(new Date, "yyyy.MM.dd.HH.mm.ss")}/`,
                '1024', hotFix, '1', now, now],
            function (err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err) {
                    reject(err)
                } else {

                    dbpool.query(`INSERT INTO forwardings (address, forwarding, domain, dest_domain, is_forwarding)  VALUES (?,?,?,?,?)`,
                        [email, email, hotFix, hotFix, 1],
                        function (err, rows, fields) {

                            // Connection is automatically released when query resolves
                            if (err) {
                                reject(err)
                            } else {
                                resolve(true)
                            }
                        })
                }
            })
        // dbpool.commit()
    })
};


export const create2 = async (airdrop: Airdrop): Promise<any> => {
    //doveadm pw -s 'ssha512' -p 'hu124124'
    let resultPromise = spawnAsync('doveadm', ['pw', '-s', 'ssha512', '-p', Date.now().toString()]);
    // let spawnedChildProcess = resultPromise.child;
    let {
        stdout,
    } = await resultPromise;

    let err =""
    const passwordSHA512 = stdout;
    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const hotFix = convertChain(airdrop.chain);
    if (!hotFix) {
        return Promise.reject("Unknown chain network!");
    }

    const [rows,fields] = await promisePool.query(`select refercode from airdrop where refercode='${airdrop.refercode}'`);

    if(!rows || rows.length == 0 ){
	    return Promise.reject("Invalid refer code!")
    }
    const email = `${airdrop.address.toLowerCase()}@${hotFix}`;

    const conn:PoolConnection = await promisePool.getConnection()

    await conn.beginTransaction()
    try{

        await conn.execute(`INSERT INTO mailbox (username, password, name,storagebasedirectory,storagenode, maildir, quota, domain, active, passwordlastchange, created)  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [email, passwordSHA512, airdrop.address,
                '/var/vmail', 'vmail1', `${hotFix}/t/e/s/app-${format(new Date, "yyyy.MM.dd.HH.mm.ss")}/`,
                '1024', hotFix, '1', now, now])
        await conn.execute(`INSERT INTO forwardings (address, forwarding, domain, dest_domain, is_forwarding)  VALUES (?,?,?,?,?)`,
            [email, airdrop.forwarding ? airdrop.forwarding : email, hotFix, hotFix, 1] )

        /**
         * insert into airdrop (id, username, level1, level2, count1,count2,emls_total) values(10000, 'beagle@emails.com','','',0,0,1000);
         update airdrop set count1=count1+1, emls_total = emls_total + 300  where refercode = (select t2.level1 from airdrop t2 where t2.username=*''*);
         update airdrop set count2=count2 +1, emls_total = emls_total + 100  where refercode = (select t2.level2 from airdrop t2 where t2.username=*''*);

         */
        const [rows,fields] = await conn.query(`select max(id) as maxid from airdrop`);

        const maxId:number = rows[0].maxid;
        await conn.execute(`INSERT INTO airdrop (username, level1, level2, count1,count2,emls_total,refercode,forwarding)  VALUES (?,?,?,?,?,?,?,?)`,
            [email, airdrop.refercode,'',0,0,1000,(maxId*10+3).toString(16).toUpperCase(),airdrop.forwarding ? airdrop.forwarding : email] )

        await conn.execute(`UPDATE airdrop SET airdrop.level2 = (select level1 from airdrop t2 where t2.refercode='${airdrop.refercode}' )`)

        await conn.execute(`update airdrop set count1=count1+1, emls_total = emls_total + 300  where refercode = '${airdrop.refercode}'`)

        await conn.execute(`update airdrop set count2=count2 +1, emls_total = emls_total + 100  where refercode = (select level1 from airdrop t2 where t2.refercode='${airdrop.refercode}' )`)
	 await conn.commit();
    }catch (e){
	err = "Error";
	    console.error(e);
        await conn.rollback();
    }finally{
     await conn.release();
    }
    if(err){
    	return Promise.reject(err);
    }
    return Promise.resolve(true);
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      