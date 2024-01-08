import { PublicKey } from '@solana/web3.js';
import BN from "bn.js";

const DEV_KEY = new PublicKey("H2BDrMMu4mC9sizCAyFeMsTmQfn2ZFTjHka5HZqUZkkB");
const SERVICE_KEY = new PublicKey("GjwX844nrMLBkizBqmryyAvfuz2tHTqni3uRqU5Edan2");

const CONFIG = {
	siteUrl: "https://www.crazydice.app/",
	apiUrl: "https://www.crazydice.app/api/",
	endpoint: "https://api.mainnet-beta.solana.com",
	cluster: "",
	bn100: new BN(100),
	bn1000: new BN(1000),
	transactionFee: 0.000005,
	dev: {
		key: DEV_KEY,
		fees: {
			sol: new PublicKey("s2G9CoEQYQzHsr6V7JXxin58zATFYvGKFT3teDbTR1D"),
			usdt: new PublicKey("7PMKb1HKoAHWodBGL7GUsCfpxbMss3uGXchzH49x7Jky"),
			usdc: new PublicKey("DvafscvnNTBLv2nnmDTJqxKvpbsyd4NRTiMvqeAnAKT7"),
			link: new PublicKey("FqVVc3sD2jX2iSJzGe4HrDciazRkzLDh7kgRUQZV8KbB"),
			samo: new PublicKey("DaSJgJjoSSqLVuW96SZeQsbhFjh9dbzCFQ21wvtoX8aD")
		},
		tokens: {
			lcds: {
				sol: new PublicKey("3j9SqTwr8yQoTTFxUfD9acmD3zi7siwFVr9Ur86t97SN"),
				usdt: new PublicKey("GMh9NPtVuowGLwyojM4KLbeMMMG5NM84mxALGLo8m8Pf"),
				usdc: new PublicKey("43kyDqkPfNiehF1JVkBnjwuXoMY4qQ8wEwHuQZCXULkH"),
				link: new PublicKey("F2N17D4kUavBv6B14Svj182PEqH6kgKZCQHFfqgjVaBq"),
				samo: new PublicKey("CgHgfBeyzz8mPBzLSZpMJXXawtdNXRH2kivFewfwAzU8")
			}
		},
		dividendRate: new BN(5),
		riskyRate: 1
	},
	service: {
		key: SERVICE_KEY,
		manage: new PublicKey("6R6f7mHHHCHUxTQG7jMi5t5BnUxzsUHxsDz5RXCSLevx"),
		dividend: {
			key: new PublicKey("EJAhyMAbCStwUaf17aCabQoCKVSKVA1m5KDdNMb9qf2W"),
			fundpools: {
				sol: new PublicKey("H9LAbFfKWHn1vE1qomcMUJkuB8Xb6aAavW9pdoE9S44f"),
				usdt: new PublicKey("2hFo3KpXgHjAr7oac5JDun5sRS1gijoKggKWZ4eD56XQ"),
				usdc: new PublicKey("BJVk2QkLn2FwZdtjDP8cEAbagF7inRBhbLczqnspaqDq"),
				link: new PublicKey("CnJAdmi97NYFns8SmdFtkFZnurtb9NhYyKC6abRKGR4y"),
				samo: new PublicKey("8bZmNRgEyk8krcx264mrG1e5pf57ByhG9HW8bzxsqsiZ")
			}
		},
		risky: {
			key: new PublicKey("72q7LNmQxuMx39LUtwm9frfrGhjAJGb2XSi8q5RBpgaW"),
			fundpools: {
				sol: new PublicKey("AkRgKsJEJBLUZchCc8nJd3L9B6dJqqo1dmCxbcZd5pgL"),
				usdt: new PublicKey("ETsYrvfHqU2C4YVvF75jB6AaFqnsteisvQR8QQqamobA"),
				usdc: new PublicKey("51mSSyXNQ796XMusAUdud5zvJGzNxhakTtJNCmcQzQJs"),
				link: new PublicKey("5fkdD8MeF4StmFed4pyUjRnmsgsupFeR8SBq6FT3tX2F"),
				samo: new PublicKey("A97qNEZkPg2wPptJMtY98Stp1oqajEZTDQEzsJZXfGnL")
			},
            depositSeed: Buffer.from("risky_deposit")
		},
		dataSeed: "data-v2",
		dataSeedOlds: ["data"],
		dataSpace: 249,
		nonceSeed: 'crazydice-bet-nonce-account'
	},
	tokens: {
		lcds: {
			sol: new PublicKey("3hT6jycBqLLNA7vyYczq8Byo1oFpT6UEH6UK7aFu9UBf"),
			usdt: new PublicKey("5CAmbZa5RFdRpGCiDh6ADzVetupyNjnyMMeBfQgyPCzT"),
			usdc: new PublicKey("7R78EGQjThEVchSUGuzs3KgptMg37FxzgKpaLcGYp7pi"),
			link: new PublicKey("B7dLZ8LVV7bR5xJEpRzmkYk7sx7pBkiqkf58ZHpPiNpw"),
			samo: new PublicKey("CXbhgErBXhKiTJu95dK1aaoHukrg1Ghn8N2Spda7wSV")
		},
		risks: {
			sol: new PublicKey("nvW2Fqyei7s1DhWqjiQU81eUxVE7iY4zKnicbL3yr61"),
			usdt: new PublicKey("9xCabyenVjP7H2uQbMkLvvAdrEmQhpZDjDETuunjMqs"),
			usdc: new PublicKey("GWDCXrc79q1xMroKisZmpSk5PXpgivD88pCg4mS63Ghf"),
			link: new PublicKey("RuWFALHvbEY224W5ktzSVm4RP1FcV1wykJkfmuCQXkt"),
			samo: new PublicKey("J7SNiV2ah5z9g1rGA9oWgET4XsbwuSCWjNNDBdboAmPp"),
		},
		moneys: {
			sol: new PublicKey("So11111111111111111111111111111111111111112"),
			usdt: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
			usdc: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
			link: new PublicKey("CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG"),
			samo: new PublicKey("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"),
		},
		names: ['sol', 'usdt', 'usdc', 'link', 'samo'],
		indexs: {
			sol: 0,
			usdt: 1,
			usdc: 2,
			link: 3,
			samo: 4
		}
	},
	decimals: {
		sol: {'num':1000000000, fixed: 9},
		usdt: {'num':1000000, fixed: 6},
		usdc: {'num':1000000, fixed: 6},
		link: {'num':1000000, fixed: 6},
		samo: {'num':1000000000, fixed: 9}
	},
	dice: {
		key: new PublicKey("2j7bWrDFPKoyEFNhveCMLj7QZVrCWevBWAEXPeYDMRf1"),
		manage: new PublicKey("F7FXZ6FaHFCoYrp83UyDXEkmSp4QrWCY5bHgMY3skvNS"),
		config: new PublicKey("GmwtRishuhrrvhDiJYgR5Do6doA2FJDtwTwVniNq9bVH"),
		service: new PublicKey("5KUxvj6qXrKBYYe8Z1yJY3THx6VtWcg2ZG7XbaMPTRwb"),
		betSeed: "bet",
		betSpace: 60,
		betAmouts: {
			sol: {min: 0.01, max: 5, fixed: 2},
			usdt: {min: 1, max: 1000, fixed: 0},
			usdc: {min: 1, max: 1000, fixed: 0},
			link: {min: 0.05, max: 30, fixed: 2},
			samo: {min: 10, max: 10000, fixed: 0}
		}
	},
	slot: {
		key: new PublicKey("8u8btPRhT6pqWmdUuE9DGoiqT7zbvpvkbD5QxGFjawHw"),
		manage: new PublicKey("EBvJ3cApxJ4LpRegXzrYEDnP7vPYZPgN8g6hNkb3m1oM"),
		config: new PublicKey("7AHfP7tGKDs6rJhGyPNPUzqgsiUcAtNjovNnmJRXfhV3"),
		service: new PublicKey("8Ku7wpNLuGNgPudU2JNmWx2XFyDrtbByvYgmvygudsxh"),
		betSeed: "bet",
		betSpace: 54,
		betAmouts: {
			sol: {min: 0.01, max: 5, fixed: 2},
			usdt: {min: 1, max: 1000, fixed: 0},
			usdc: {min: 1, max: 1000, fixed: 0},
			link: {min: 0.05, max: 30, fixed: 2},
			samo: {min: 10, max: 10000, fixed: 0}
		}
	},
	platform: {
		key: new PublicKey("9dkdoyrAeZ3qhkVvbS2wu2Z1tvKUqFsqDVcnzPFou6N6"),
		service: new PublicKey("6TubLsYC2EcooxRHeejgyrFokJ49i78PSMriB9S9z9Ff")
	},
	get: (key:string) => {
		return eval(`CONFIG.${key}`);
	}
};

if (process.env.NODE_ENV != 'production') {
	CONFIG.siteUrl = "http://localhost:8081/";
	CONFIG.apiUrl = "http://localhost:8080/";
	CONFIG.endpoint = "http://127.0.0.1:8899";
	CONFIG.dev.fees = {
		sol: new PublicKey("s2G9CoEQYQzHsr6V7JXxin58zATFYvGKFT3teDbTR1D"),
		usdt: new PublicKey("U7rrLax8eNiKxbXjnUKvB7zZHMzHmnQPA4sDzsYCmVF"),
		usdc: new PublicKey("29uhTNH2EzR2X1QoP5jozSt2omUtX7d9ts3fU8edAoa2"),
		link: new PublicKey("GVJkhLWnGYBAKBNU8rj7xAcRpLAwoYSjhARm1G4y1EyU"),
		samo: new PublicKey("TKiQrS2DRsWbi9Xy4UdAfNpyzZ5xjgTRW7ndEHGM3qg")
	};
	CONFIG.tokens.moneys = {
		sol: new PublicKey("So11111111111111111111111111111111111111112"),
		usdt: new PublicKey("CEBLUu1Pji4Cyf6dgYEoQzqtZQtNNGwvS88Wdyy8GMUM"),
		usdc: new PublicKey("866HGa2Wp5cRLfA5XkfqgTfzCQ7Ci21KC2QbH2fDrvnW"),
		link: new PublicKey("DqASU78CmTSwzq4xK3fgU3YmaJ4QxhiHyrCjd3C9c93y"),
		samo: new PublicKey("8joA8sD3FGXZEjaipkqmK2Lz7Qy2PGPyPx64jSWVuKnJ"),
	};
}

export { CONFIG };