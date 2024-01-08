import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_TOKEN_STORAGE_KEY = "useraccounttoken";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor() {
  }

  public getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  public setAuthtoken(token: string) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  public deleteAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
}