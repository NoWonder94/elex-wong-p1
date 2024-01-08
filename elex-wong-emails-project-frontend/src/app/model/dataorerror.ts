
export enum ErrorCode {
  EXISTING_ACCOUNT = 0, // The account exists (but should not)
  INEXISTING_ACCOUNT = 1, // The account is not found (but should be found)
  INVALID_REFER_CODE = 2, // A refer code doesn't correspond to any existing account
  EXISTING_EMAIL = 3, // The email exists
  INVALID_ACCESS_TOKEN = 4, // The access token is invalid
  VERIFY_ACCOUNT = 5, // The account need to be verified

  // FILES
  FORBIDDEN_FILE_TYPE_UPLOADED = 6
}

export type DisplayableError = {
  clientCode: ErrorCode; // Numeric code understandable by the client side for better handling
  displayableMessage: string; // User friendly message
}
export type DataOrError<T> = {
  httpError?: number;
  displayableError?: DisplayableError;
  data?: T;
}

export const dataOrErrorData = <T>(dataOrError: DataOrError<T>): T => {
  return dataOrError.data;
}

export const hasError = (dataOrError: DataOrError<unknown>): boolean => {
  return !!dataOrError.httpError;
}

export const hasDisplayableError = (dataOrError: DataOrError<unknown>): boolean => {
  return !!dataOrError.displayableError;
}

export const displayableErrorCode = (dataOrError: DataOrError<unknown>): ErrorCode => {
  return dataOrError.displayableError.clientCode;
}

export const displayableErrorMessage = (dataOrError: DataOrError<unknown>): string => {
  return dataOrError.displayableError.displayableMessage;
}