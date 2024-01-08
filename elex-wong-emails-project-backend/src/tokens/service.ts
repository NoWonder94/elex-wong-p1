import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError, serverError } from "../common/dataorerror";
import { convertedEditionValue, TypedEditionKeyEntry, UpdatedEntry } from "../common/updatedentry";
import { prisma } from "../db";
import { Account, ERC20Token } from "../generated/prisma/main-schema";
import { projectsService } from "../projects/service";

class TokensService {
  public async getProjectTokens(account: Account, projectId: number): Promise<DataOrError<ERC20Token[]>> {
    try {
      let tokens = await prisma.eRC20Token.findMany({
        where: {
          project: {
            accountUid: account.id
          },
          projectPid: projectId
        }
      });

      return dataOrErrorData(tokens);
    }
    catch (e) {
      return serverError("Get project tokens prisma query error");
    }
  }

  public async getProjectToken(account: Account, projectId: number, tokenId: number): Promise<DataOrError<ERC20Token>> {
    try {
      let token = await prisma.eRC20Token.findFirst({
        where: {
          id: tokenId,
          project: {
            accountUid: account.id
          },
          projectPid: projectId
        }
      });

      return dataOrErrorData(token);
    }
    catch (e) {
      return serverError("Get project token prisma query error");
    }
  }

  public async createToken(account: Account, projectId: number, title: string): Promise<DataOrError<ERC20Token>> {
    // Make sure the project belongs to the signed in user
    let accountProjectOrError = await projectsService.getAccountProjectById(account, projectId);
    if (hasError(accountProjectOrError))
      return convertedError(accountProjectOrError);

    if (!accountProjectOrError.data)
      return invalidParamError("Project not found, or doesn't belong to this user");

    let token = await prisma.eRC20Token.create({
      data: {
        title,
        symbol: "",
        project: { connect: { id: projectId } },
        contract_address: "",
        decimals: 18,
        chain_id: 1 // Default - ethereum
      }
    });

    return dataOrErrorData(token);
  }

  public async updateTokenField(account: Account, projectId: number, tokenId: number, updatedEntry: UpdatedEntry): Promise<DataOrError<void>> {
    try {
      // Get the token and make sure it belongs to current user
      let token = await prisma.eRC20Token.findFirst({
        where: {
          id: tokenId,
          projectPid: projectId,
          project: {
            accountUid: account.id
          }
        }
      });

      if (!token)
        return invalidParamError("Token not found, or doesn't belong to this user");

      const allowedEditionKeys: TypedEditionKeyEntry[] = [
        { key: "title", type: "string" },
        { key: "chain_id", type: "int" },
        { key: "contract_address", type: "string" },
        { key: "symbol", type: "string" },
        { key: "decimals", type: "int" },
        { key: "activated_at", type: "string" }
      ];

      let finalValueOrError = await convertedEditionValue(allowedEditionKeys, updatedEntry);
      if (hasError(finalValueOrError))
        return convertedError(finalValueOrError);

      // Update in database
      let updateData = {};
      updateData[updatedEntry.key] = finalValueOrError.data;

      await prisma.eRC20Token.update({
        data: updateData,
        where: {
          id: token.id
        }
      });

      return dataOrErrorData();
    }
    catch (e) {
      return serverError("Update token prisma error", e);
    }
  }
}

export const tokensService = new TokensService();