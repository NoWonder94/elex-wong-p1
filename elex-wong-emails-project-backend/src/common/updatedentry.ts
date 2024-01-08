import { convertedError, DataOrError, dataOrErrorData, hasError, invalidParamError } from "./dataorerror";

/**
 * Type to store updated inofrmation about a project, campaign, etc.
 * Usually received from the frontend for remote update.
 */
export type UpdatedEntry = {
  key: string;
  value: number | string;
}

type TypedEditionKeyListType = "int" | "string" | "boolean";

/**
 * List of database field names (project, campaign, etc) that can be edited by users.
 * TypedEditionKeyListType indicated the key type for conversion before updating the database.
 */
export type TypedEditionKeyEntry = {
  key: string;
  type: TypedEditionKeyListType;
  initialCheck?: (value: number | string | boolean) => DataOrError<void> | Promise<DataOrError<void>>;
  protected?: boolean; // Protected entries can be updated only by the backend, not by the frontend / users.
}

export async function convertedEditionValue(allowedEditionKeys: TypedEditionKeyEntry[], updatedEntry: UpdatedEntry, allowUpdatingProtected = false): Promise<DataOrError<number | string | boolean>> {
  let value: number | string | boolean = null;

  // Trying to handle a key that is not in the list of allowed keys that users can edit: error
  let editionEntry = allowedEditionKeys.find(e => e.key === updatedEntry.key);
  if (!editionEntry)
    return invalidParamError(`Entry with key ${updatedEntry.key} can't be edited`);

  // Only allow to edit protected entried from safe contexts
  if (editionEntry.protected && !allowUpdatingProtected)
    return invalidParamError(`Entry with key ${updatedEntry.key} can't be edited because it's protected and the calling context is not marked as safe`);

  if (editionEntry.type === "string")
    value = `${updatedEntry.value}`;
  else if (editionEntry.type === "int")
    value = parseInt(<any>updatedEntry.value);
  else if (editionEntry.type === "boolean")
    value = Boolean(<any>updatedEntry.value);

  if (!value)
    return invalidParamError(`Edition type for ${updatedEntry.key} is unknown`);

  // If there is a precondition check method, call it. It will return an error if the precondition
  // is not met
  if (editionEntry.initialCheck) {
    let verifiedOrError = await editionEntry.initialCheck(value);
    if (hasError(verifiedOrError))
      return convertedError(verifiedOrError);
  }

  return dataOrErrorData(value);
}