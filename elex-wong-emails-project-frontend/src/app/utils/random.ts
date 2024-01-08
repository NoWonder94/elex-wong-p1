export const randomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
}

/**
 * @param chance 0-100 probability to succeed
 * @return true if succeeding
 */
export const randomSuccess = (chance: number): boolean => {
  return chance > randomInt(100);
}