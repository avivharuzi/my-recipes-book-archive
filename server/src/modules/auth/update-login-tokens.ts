import { LoginTokens } from './login-tokens';

export interface UpdateLoginTokens extends LoginTokens {
  userId: string;
}
