import { logger } from "../logger";

export enum ErrorType {
    STATE_ERROR, // 400
    FORBIDDEN_ACCESS, // 401
    INVALID_PARAMETER, // 403
    NOT_FOUND, // 404
    SERVER_ERROR // 500
}

export enum ErrorCode {
    EXISTING_ACCOUNT = 0, // The account exists (but should not)
    INEXISTING_ACCOUNT = 1, // The account is not found (but should be found)
    INVALID_REFER_CODE = 2, // A refer code doesn't correspond to any existing account
    EXISTING_EMAIL = 3, // The email exists
    INVALID_ACCESS_TOKEN = 4, // The access token is invalid
    VERIFY_ACCOUNT = 5, // The account need to be verified

    // FILES
    FORBIDDEN_FILE_TYPE_UPLOADED = 6,
    INVALID_ACTION = 7, // The action is invalid

    // BLOCKCHAINS
    UNSUPPORTED_NETWORK = 100,

    // ERC20 REWARDS
    NOT_ENOUGH_TOKENS = 200
}

export type DisplayableError = {
    clientCode: ErrorCode; // Numeric code understandable by the client side for better handling
    displayableMessage: string; // User friendly message
}

export type DataOrError<T> = {
    error?: DisplayableError | string, // If there is an error, the error message. String if internal error, or DisplayableError to return the error to users.
    errorType?: ErrorType; // Hint to assess the http error code to return
    data?: T;
}

export const displayableError = <T>(errorType: ErrorType, clientCode: ErrorCode, displayableMessage: string): DataOrError<T> => {
    return {
        error: {
            clientCode, displayableMessage
        },
        errorType
    }
};

export const error = <T>(errorType: ErrorType, error: string): DataOrError<T> => {
    return {
        error, errorType
    }
};

export const accessForbiddenError = <T>(message: string): DataOrError<T> => {
    return error(ErrorType.FORBIDDEN_ACCESS, message);
};

export const invalidParamError = <T>(message: string): DataOrError<T> => {
    return error(ErrorType.INVALID_PARAMETER, message);
};

export const stateError = <T>(message: string): DataOrError<T> => {
    return error(ErrorType.STATE_ERROR, message);
};

export const notFoundError = <T>(message: string): DataOrError<T> => {
    return error(ErrorType.NOT_FOUND, message);
};

export const serverError = <T>(message: string, e?: any): DataOrError<T> => {
    if (e)
        logger.error("Server error:", e);

    return error(ErrorType.SERVER_ERROR, message);
};

export const logAndThrowError = (message: string) => {
    logger.error(message);
    throw new Error(message);
}

export const internalServerError = (err: unknown) => {
    logger.error(err);
    return {
        errorType: ErrorType.SERVER_ERROR,
        error: "Internal server error" // Note: don't return internal error details
    };
}

/**
 * Shortcut to return non-errored data
 */
export const dataOrErrorData = <T>(data?: T) => {
    return {
        data
    };
}

/**
 * Returns the data field of a DataOrError entry. 
 * Should be called only if no error.
 */
export const successfulData = <T>(dataOrError: DataOrError<T>): T => {
    return dataOrError.data;
}

export const convertedError = <T>(otherError: DataOrError<unknown>): DataOrError<T> => {
    return {
        errorType: otherError.errorType,
        error: otherError.error
    };
}

export const hasError = (dataOrError: DataOrError<unknown>): boolean => {
    return !!dataOrError.error;
}