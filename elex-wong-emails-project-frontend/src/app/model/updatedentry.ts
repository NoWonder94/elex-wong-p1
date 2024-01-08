/**
 * Type to store updated inofrmation about a project, campaign, etc.
 * Usually sent to the backend for remote update.
 */
export type UpdatedEntry = {
  key: string;
  value: number | string | Date;
}
