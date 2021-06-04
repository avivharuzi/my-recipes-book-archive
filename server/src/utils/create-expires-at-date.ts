export const createExpiresAtDate = (days: number): number => {
  return Date.now() + 86400000 * days;
};
