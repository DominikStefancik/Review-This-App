import { AuthToken } from '../auth-token';

export interface ApiKeyVerifier {
  verify(apiKey: string): Promise<AuthToken>;
}
