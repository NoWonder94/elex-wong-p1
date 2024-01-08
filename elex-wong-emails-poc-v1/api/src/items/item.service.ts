import {format} from 'date-fns';
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
    } else if (chain == "0x89") {
        hotFix = "matic.emails.com"
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

	let level2 = "";
	{
		const [rows,fields] = await conn.query(`select level1 from airdrop t2 where t2.refercode='${airdrop.refercode}'`)
		level2 =  rows[0].level1;
	}

	let level3 = "";
	{
		const [rows,fields] = await conn.query(`select level2 from airdrop t2 where t2.refercode='${airdrop.refercode}'`)
		level3 =  rows[0].level2;
	}


	await conn.execute(`INSERT INTO airdrop (username, level1, level2, level3,count1,count2, count3, emls_total, refercode, forwarding)  VALUES (?,?,?,?,?,?,?,?)`,
			  [email, airdrop.refercode, level2, level3, 0, 0, 0, 1000,(maxId*10+3).toString(16).toUpperCase(), airdrop.forwarding ? airdrop.forwarding : email] )



        await conn.execute(`update airdrop set count1=count1+1, emls_total = emls_total + 500  where refercode = '${airdrop.refercode}'`)

        await conn.execute(`update airdrop set count2=count2 +1, emls_total = emls_total + 200  where refercode = (select level1 from airdrop t2 where t2.refercode='${airdrop.refercode}' )`)

        await conn.execute(`update airdrop set count3=count3 +1, emls_total = emls_total + 100  where refercode = (select level2 from airdrop t2 where t2.refercode='${airdrop.refercode}' )`)

        await conn.commit();

    }catch (e){
	err = "Error";
	    console.log(e);
        await conn.rollback();
    }finally{
     await conn.release();
    }
    if(err){
    	return Promise.reject(err);
    }
    return Promise.resolve(true);
};
