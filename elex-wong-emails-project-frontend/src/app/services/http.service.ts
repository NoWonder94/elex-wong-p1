import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataOrError, DisplayableError, ErrorCode } from '../model/dataorerror';
import { Logger } from '../utils/logger';
import { AuthTokenService } from './authtoken.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private authTokenService: AuthTokenService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  public async backEndJsonGet<T>(url: string): Promise<DataOrError<T>> {
    return this.authenticatedJsonGet(environment.api.url, url);
  }

  public async adminBackEndJsonGet<T>(url: string): Promise<DataOrError<T>> {
    return this.authenticatedJsonGet(environment.api.adminUrl, url);
  }

  private async authenticatedJsonGet<T>(rootUrl: string, url: string): Promise<DataOrError<T>> {
    let response = await fetch(`${rootUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": this.authTokenService.getAuthToken()
      }
    });

    if (response && response.status === 200) {
      let textContent = await response.text();
      let jsonContent = textContent ? JSON.parse(textContent) : null;

      let dataOrError: DataOrError<T> = {
        data: <T>jsonContent
      }
      return dataOrError;
    }
    else {
      return this.httpResponseToDataOrError(url, response);
    }
  }

  public async backEndJsonPost<T>(url: string, body?: Object): Promise<DataOrError<T>> {
    return this.authenticatedJsonPostUpdate(environment.api.url, "POST", url, body);
  }

  public async adminBackEndJsonPost<T>(url: string, body?: Object): Promise<DataOrError<T>> {
    return this.authenticatedJsonPostUpdate(environment.api.adminUrl, "POST", url, body);
  }

  public async backEndJsonUpdate<T>(url: string, body?: Object): Promise<DataOrError<T>> {
    return this.authenticatedJsonPostUpdate(environment.api.url, "UPDATE", url, body);
  }

  private async authenticatedJsonPostUpdate<T>(rootUrl: string, method: "POST" | "UPDATE", url: string, body?: Object): Promise<DataOrError<T>> {
    let response = await fetch(`${rootUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "token": this.authTokenService.getAuthToken()
      },
      body: body ? JSON.stringify(body) : null
    });

    if (response && response.status === 200) {
      let textContent = await response.text();
      let jsonContent = textContent ? JSON.parse(textContent) : null;

      let dataOrError: DataOrError<T> = {
        data: <T>jsonContent
      }
      return dataOrError;
    }
    else {
      return this.httpResponseToDataOrError(url, response);
    }
  }

  private async httpResponseToDataOrError(url: string, response: Response): Promise<DataOrError<any>> {
    let errorMessage = await response.text();

    Logger.error("http", "Issue with the backend:", url, response.statusText, errorMessage);

    // Try to parse as displayable error
    let displayableError: DisplayableError;
    try {
      displayableError = JSON.parse(errorMessage);
    }
    catch (e) { }

    let status = response.status;
    let dataOrError: DataOrError<any> = {
      httpError: status,
      displayableError
    }

    this.toastService.errorIfDisplayable(dataOrError);

    let clientCode = dataOrError.displayableError ? dataOrError.displayableError.clientCode : -1;
    switch (Number(clientCode)) {
      case ErrorCode.INVALID_ACCESS_TOKEN: // access token is expired
        this.authTokenService.deleteAuthToken();
        this.router.navigateByUrl("/connect");
        break;
      case ErrorCode.VERIFY_ACCOUNT: // account is not verified
        this.router.navigateByUrl("/account-info");
        break;
      default:
        break;
    }

    return dataOrError;
  }
}
