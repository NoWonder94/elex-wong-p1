export interface BaseItem {
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
    ip?:string
    daoid?:string
}

export interface Airdrop extends BaseAirdrop {
    address?: string
    nonce?: string;
    sig?: string;
    chain?:any
}
