import { Injectable } from '@angular/core';
import { hasError } from '../model/dataorerror';
import { ReferralCode } from '../model/referralcode';
import { Logger } from '../utils/logger';
import { HttpService } from './http.service';

type FetchCodeInfoResponse = {
  code: ReferralCode;
}

@Injectable({
  providedIn: 'root'
})
export class RefCodeService {
  constructor(
    private http: HttpService
  ) { }

  public async init(): Promise<void> {
    Logger.log("refcode", "Ref code service is initializing");
    return;
  }

  /**
   * Retrieves information about a ref code
   */
  public async fetchCodeInfo(code: string): Promise<ReferralCode> {
    let codeOrError = await this.http.backEndJsonGet<FetchCodeInfoResponse>(`/codes/${code}`);
    if (!hasError(codeOrError)) {
      return codeOrError.data.code;
    }
    else {
      return null;
    }
  }
}