import { createRandomToken } from '../../utils/create-random-token';

export const createCsrfToken = (): Promise<string> => {
  return createRandomToken();
};
