/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { apiError } from "../common/api";
import { displayableError, ErrorCode, ErrorType, hasError, invalidParamError } from "../common/dataorerror";
import { UpdatedEntry } from "../common/updatedentry";
import { ERC20Token } from "../generated/prisma/main-schema/index";
import { authMiddleware } from "../middleware/auth.middleware";
import { networksService } from "../networks/service";
import { erc20TokensService } from "./service";

type GetProjectTokensRequest = {};

type GetProjectTokensResponse = {
	tokens: ERC20Token[];
}

type CreateTokenBody = {
	title: string;
}

type CreateTokenResponse = {
	token: ERC20Token;
}

type UpdateTokenResponse = {
}

type CreateAirdropContractBody = {
	chainId: number; // Target blockchain
}

type CreateAirdropContractResponse = {
	encodedABI: string;
	gas: number;
	gasPrice: string;
	chainId: number;
}

type AirdropContractCreatedBody = {
	transactionHash: string; // Hash of the published airdrop contract transaction
}

type AirdropContractCreatedResponse = {
	creationConfirmed: boolean;
}

type CreateAirdropContractDepositBody = {
	chainId: number; // Target blockchain
}

type CreateAirdropContractDepositResponse = {
	encodedABI: string;
	gas: number;
	gasPrice: string;
	to: string;
	chainId: number;
}

type CheckAirdropDepositBody = {
	transactionHash: string;
}

type CheckAirdropDepositResponse = {
	depositConfirmed: boolean;
	erc20_airdrop_deposit_discovered_at: string; // ISO date
}

export const configureTokensRoutes = (router: Router): void => {
	/**
	 * Gets project tokens
	 */
	router.get<any, GetProjectTokensResponse, GetProjectTokensRequest>('/projects/:projectId/tokens', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);

		let tokensOrError = await erc20TokensService.getProjectTokens(req.account, projectId);
		if (hasError(tokensOrError))
			return apiError(res, tokensOrError);

		res.json({ tokens: tokensOrError.data });
	});

	/**
	 * Creates a new token for a project
	 */
	router.post<any, CreateTokenResponse, CreateTokenBody>('/projects/:projectId/tokens', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let title = req.body.title;

		if (!title)
			return apiError(res, invalidParamError("Token title is missing"));

		let tokenOrError = await erc20TokensService.createToken(req.account, projectId, title);
		if (hasError(tokenOrError))
			return apiError(res, tokenOrError);

		res.json({ token: tokenOrError.data });
	});

	/**
	* Updates token fields (by owner)
	*/
	router.post<any, any, UpdateTokenResponse>('/projects/:projectId/tokens/:tokenId/update', authMiddleware, async (req, res) => {
		let updatedEntry = <UpdatedEntry>req.body;
		let projectId = parseInt(req.params.projectId);
		let tokenId = parseInt(req.params.tokenId);

		let resultOrError = await erc20TokensService.updateTokenField(req.account, projectId, tokenId, updatedEntry);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({});
	});

	/**
	 * Request to create an airdrop contract.
	 * The unsigned contract transaction is returned and must be published by the account on the client side.
	 */
	router.post<any, CreateAirdropContractResponse, CreateAirdropContractBody>('/projects/:projectId/campaign/:campaignId/airdropcontract/create', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);
		let chainId = req.body.chainId;
		let network = networksService.findNetworkByEVMChainId(chainId);

		if (!network)
			return apiError(res, displayableError(ErrorType.INVALID_PARAMETER, ErrorCode.UNSUPPORTED_NETWORK, `Unsupported chain ID ${chainId}`));

		let contractOrError = await erc20TokensService.createAirdropContractPayload(req.account, projectId, campaignId, network);
		if (hasError(contractOrError))
			return apiError(res, contractOrError);

		res.json({
			encodedABI: contractOrError.data.encodedABI,
			gas: contractOrError.data.gas,
			gasPrice: contractOrError.data.gasPrice,
			chainId
		});
	});

	/**
	 * Client side notifies us that the project owner has created the airdrop contract.
	 * This information is verified and saved.
	 */
	router.post<any, AirdropContractCreatedResponse, AirdropContractCreatedBody>('/projects/:projectId/campaign/:campaignId/airdropcontract/created', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);

		let transactionHash = req.body.transactionHash;
		if (!transactionHash)
			return apiError(res, invalidParamError("Invalid transaction hash to check for a created airdrop contract"));

		let resultOrError = await erc20TokensService.validateCreatedAirdropContract(req.account, projectId, campaignId, transactionHash);
		if (hasError(resultOrError))
			return apiError(res, resultOrError);

		res.json({
			creationConfirmed: true
		});
	});

	/**
	 * Request to create the airdrop contract deposit transaction.
	 * The unsigned transaction is returned and must be published by the account on the client side.
	 */
	router.post<any, CreateAirdropContractDepositResponse, CreateAirdropContractDepositBody>('/projects/:projectId/campaign/:campaignId/airdropcontract/createdeposit', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);
		let chainId = req.body.chainId;
		let network = networksService.findNetworkByEVMChainId(chainId);

		// Additional check to make sure the client side chain ID is consistent.
		if (!network)
			return apiError(res, displayableError(ErrorType.INVALID_PARAMETER, ErrorCode.UNSUPPORTED_NETWORK, `Unsupported chain ID ${chainId}`));

		let transactionInfoOrError = await erc20TokensService.createAirdropContractDepositTokensPayload(req.account, projectId, campaignId, network);
		if (hasError(transactionInfoOrError))
			return apiError(res, transactionInfoOrError);

		res.json({
			encodedABI: transactionInfoOrError.data.encodedABI,
			gas: transactionInfoOrError.data.gas,
			gasPrice: transactionInfoOrError.data.gasPrice,
			to: transactionInfoOrError.data.to,
			chainId
		});
	});

	/**
		 * Request to check a token deposit on the airdrop contract.
		 */
	router.post<any, CheckAirdropDepositResponse, CheckAirdropDepositBody>('/projects/:projectId/campaign/:campaignId/airdropcontract/checkdeposit', authMiddleware, async (req, res) => {
		let projectId = parseInt(req.params.projectId);
		let campaignId = parseInt(req.params.campaignId);
		let transactionHash = req.body.transactionHash;

		let depositConfirmedOrError = await erc20TokensService.checkAirdropDeposit(req.account, projectId, campaignId, transactionHash);
		if (hasError(depositConfirmedOrError))
			return apiError(res, depositConfirmedOrError);

		res.json({
			depositConfirmed: depositConfirmedOrError.data.depositConfirmed,
			erc20_airdrop_deposit_discovered_at: depositConfirmedOrError.data.erc20_airdrop_deposit_discovered_at
		});
	});
}

