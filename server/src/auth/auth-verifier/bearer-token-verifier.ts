import { AuthToken } from '../auth-token';

export interface BearerTokenVerifier {
  verify(token: string): Promise<AuthToken>;
}
