import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Account, UpdatedAccount } from '../model/account';
import { hasError } from '../model/dataorerror';
import { AuthHandshakeResponse } from '../model/responses';
import { UpdatedEntry } from '../model/updatedentry';
import { Logger } from '../utils/logger';
import { AuthTokenService } from './authtoken.service';
import { HttpService } from './http.service';
import { SocketService } from './sockets.service';
import { ToastService } from './toast.service';
import { Web3Service } from './web3.service';

const AUTH_TOKEN_STORAGE_KEY = "useraccounttoken";

const jwtHelper = new JwtHelperService();

type DecodedHandshakeToken = {
  dataToSign: string;
}

type PersonalInfoResponse = {
  accountInfo: Account;
}

type CreateAccountResponse = {
  accountInfo: Account;
}

type UpdateAccountResponse = {
  accountInfo: UpdatedAccount;
}

type VerifyEmailResponse = {}

type CheckEmailVerificationKeyResponse = {
  emailVerified: boolean;
}

type AccountStatus = {
  statusChecked: boolean;
  exists?: boolean;
}

type PublicAccountStatusResponse = {
  exists: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //private account: Account;

  public activeAccount = new BehaviorSubject<Account>(null); // emails.com account
  public accountStatus = new BehaviorSubject<AccountStatus>({
    statusChecked: false
  }); // whether the account for the active web3 wallet address exists or not, no matter if authenticated or not

  constructor(
    private http: HttpService,
    private authTokenService: AuthTokenService,
    private toastService: ToastService,
    private web3Service: Web3Service,
    private router: Router,
    private toast: ToastService,
    private socketsService: SocketService) {
  }

  public async init(): Promise<void> {
    Logger.log("account", "Account service is initializing");
    void this.loadUser();

    // When we get a wallet address, automatically fetch the public account status to
    // know if a registration is needed or just a sign in
    this.web3Service.connectedWalletAccounts.subscribe(accounts => {
      if (accounts && accounts.length > 0) {
        Logger.log("account", "Fetching account status", accounts[0]);
        this.fetchAccountStatus(accounts[0]);
      }
    });

    return;
  }

  /**
   * Reloads authenticated user info from the stored JWT.
   */
  private loadUser() {
    const token = this.authTokenService.getAuthToken();
    if (token) {
      this.activeAccount.next(Account.fromJson(jwtDecode(token)));
      this.emitAccountModified();

      Logger.log("account", "Authentication token found");

      this.connectSocketEvents();
      this.fetchPersonalInfo();
    }
    else {
      Logger.log("account", "No authenticated user");
    }
  }

  private connectSocketEvents() {
  }

  /**
   * Send a notificaiton to account observers manually.
   * Use this when the account object is modified manually, to inform listerners that
   * something has changed.
   *
   * TODO: distry - replace with subjects in account class
   */
  public emitAccountModified() {
    this.activeAccount.next(this.activeAccount.value);
  }

  /**
   * Check the public account status of a wallet address.
   */
  private async fetchAccountStatus(walletAddress: string): Promise<void> {
    let statusOrError = await this.http.backEndJsonGet<PublicAccountStatusResponse>(`/accounts/byaddress/${walletAddress}`);
    if (!hasError(statusOrError)) {
      Logger.log("account", "Got public account status:", statusOrError.data);
      this.accountStatus.next({
        statusChecked: true,
        exists: statusOrError.data.exists
      });
    }
    else {
      // Couldn't check
      this.accountStatus.next({
        statusChecked: false
      });
    }
  }

  private async fetchPersonalInfo(): Promise<void> {
    let infoOrError = await this.http.backEndJsonGet<PersonalInfoResponse>("/account/personalinfo");
    if (!hasError(infoOrError)) {
      let accountJson = infoOrError.data.accountInfo;
      Logger.log("account", "Got personal info", accountJson);
      this.activeAccount.next(Account.fromJson(accountJson));
    }
    else {
      this.activeAccount.next(null);
    }
  }

  public isAuthenticated(): boolean {
    const token = this.authTokenService.getAuthToken();
    return !!token && !jwtHelper.isTokenExpired(token);
  }

  /**
   * Returns the connected account EVM address
   */
  public getAccountAddress(): string {
    if (!this.activeAccount.value)
      return null;

    return this.activeAccount.value.address;
  }

  public async updateAccountInfo(key: string, value: number | string): Promise<void> {
    Logger.log("account", "Updating account entry:", key, value);

    let updatedEntry: UpdatedEntry = {
      key,
      value
    };

    let resultOrError = await this.http.backEndJsonPost<AuthHandshakeResponse & UpdateAccountResponse>("/account/update", updatedEntry);
    if (!hasError(resultOrError)) {
      this.toast.saved();
      return;
    }
    else {
      return; // TODO: forward errors
    }
  }

  /**
   * Send email verification
   */
  public async verifyAccount(): Promise<boolean> {
    let response = await this.http.backEndJsonPost<AuthHandshakeResponse & VerifyEmailResponse>("/account/verifyemail", {});

    if (!hasError(response)) {
      this.toastService.info("A verification code was sent to your email address");

      return true;
    }

    return false;
  }

  /**
   * Checks the email verification code to activate the account.
   */
  public async checkEmailVerificationKey(key: string): Promise<boolean> {
    Logger.log("account", "Checking email verification key");
    let response = await this.http.backEndJsonPost<AuthHandshakeResponse & CheckEmailVerificationKeyResponse>("/account/checkemailverificationkey", {
      verificationKey: key
    });

    if (!hasError(response)) {
      Logger.log("account", "Email successfully verified");
      this.activeAccount.value.forwarding_email_verified = true;
      this.emitAccountModified();
      return true;
    }

    Logger.warn("account", "Error during email verification", response);
    return false;
  }

  /**
   * Sign in process:
   * - connect to wallet (if needed), get EVM address
   * - request sign in challenge to the backend
   * - sign the challenge with the wallet (sign typed data)
   * - submit the challenge to the backend
   * - if everything ok, a JWT token is returned for further authenticated calls
   */
  public async signIn(): Promise<boolean> {
    let authChallengeResult = await this.doAuthChallenge();
    if (!authChallengeResult)
      return false;
    else {
      // Now that the challenge is completed, send it to the backend for verification and
      // to get a real auth token
      let response = await this.http.backEndJsonPost<AuthHandshakeResponse>("/auth/signin", {
        challengeToken: authChallengeResult.challengeToken,
        challengeResult: authChallengeResult.challengeResult
      });

      if (!hasError(response) && response.data.token) {
        // Successful authentication, save the auth token for further use
        this.authTokenService.setAuthtoken(response.data.token);

        // Decode the token to get active user info
        this.loadUser();

        Logger.log("account", "Successful sign in");

        return true;
      }

      return false;
    }
  }

  public async createAccount(forwardEmail: string): Promise<Account> {
    let authChallengeResult = await this.doAuthChallenge();
    if (!authChallengeResult)
      return null;
    else {
      // Now that the challenge is completed, send it to the backend for verification and
      // to get a real auth token
      let response = await this.http.backEndJsonPost<AuthHandshakeResponse & CreateAccountResponse>("/auth/register", {
        challengeToken: authChallengeResult.challengeToken,
        challengeResult: authChallengeResult.challengeResult,
        accountInfo: {
          forwardEmail
        }
      });

      if (!hasError(response) && response.data.token) {
        // Successful authentication, save the auth token for further use
        this.authTokenService.setAuthtoken(response.data.token);

        // Decode the token to get active user info
        this.loadUser();

        this.fetchAccountStatus(this.activeAccount.value.address);

        Logger.log("account", "Successful account creation");

        return response.data.accountInfo;
      }
    }

    return null;
  }

  /**
   * Calls the backend authentication challenge to get and sign the challenge.
   * The
   */
  private async doAuthChallenge(): Promise<{ challengeToken: string, challengeResult: string }> {
    Logger.log("account", "Starting new authentication process");

    let web3 = this.web3Service.getUserWeb3();
    let accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      accounts = await this.web3Service.connectWallet();
    }

    if (accounts.length > 0) {
      let account = accounts[0];

      Logger.log("acount", "Requesting auth challenge with account", account);

      // Get a pre-JWT token that contains a challenge to sign
      let handshakeOrError = await this.http.backEndJsonPost<AuthHandshakeResponse>("/auth/handshake", {
        account
      });
      if (hasError(handshakeOrError)) {
        Logger.error("account", "Handshake request error");
        return null;
      }

      let token = handshakeOrError.data.token;

      let decodedHandshakeToken = jwtDecode(token) as DecodedHandshakeToken;

      // Sign with the EVM address
      return new Promise(resolve => {
        web3.eth.givenProvider.sendAsync({
          method: 'eth_signTypedData_v4',
          params: [account, decodedHandshakeToken.dataToSign],
          from: account
        }, async (err, result: { result?: string }) => {
          if (!err && result.result) {
            resolve({
              challengeToken: token,
              challengeResult: result.result
            });
          }
          else {
            resolve(null);
          }
        });
      });
    }
    else {
      // TODO
      Logger.warn("account", "No EVM account available");
      return null;
    }
  }

  public signOut() {
    this.authTokenService.deleteAuthToken();

    this.activeAccount.next(null);

    // Go back to home screen after signing out
    this.router.navigate(["/"]);
  }
}