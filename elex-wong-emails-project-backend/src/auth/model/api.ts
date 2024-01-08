import { PublicAccountInfo } from "../../accounts/model/publicaccountinfo";

export type HandshakeRequest = {
  account: string; // EVM address
}

export type HandshakeResponse = {
  token: string; // Temporary token for challenge, not an auth token
}

export type SignInRequest = {
  challengeToken: string;
  challengeResult: string;
}

export type SignInResponse = {
  token: string; // Authentication token
}

export type RegisterRequest = {
  challengeToken: string;
  challengeResult: string;

  accountInfo: {
    forwardEmail: string;
  }
}

export type RegisterResponse = {
  token: string; // Authentication token
  accountInfo: PublicAccountInfo;
}

export type UpdateAccountResponse = {
  accountInfo: UpdatedAccountInfo;
}

/**
* Payload of the JWT used in the initial auth challenge
*/
export type AuthChallengeToken = {
  account: string; // EVM address
  dataToSign: string; // stringified EIP721 json data for eth_signTypedData_v4
}