import * as express from 'express';

import { ApiKeyVerifier } from '../../auth/auth-verifier/api-key-verifier';
import { BearerTokenVerifier } from '../../auth/auth-verifier/bearer-token-verifier';
import { AuthEnrichment } from '../../handlers/request';
import { ApiKeyScopeVerifier } from '../scope-verifier/api-key-scope-verifier';
import { UserTokenScopeVerifier } from '../scope-verifier/user-token-scope-verifier';

/**
 * Factory class for creating an authentication middleware, which checks authentication based on different methods
 * (e.g. API Key, OAuth2, etc.)
 */
export class AuthenticationMiddlewareFactory {
  /**
   * Returns an authentication middleware which checks the Api Key in the header of each request.
   */
  public getForApiKey(
    verifier: ApiKeyVerifier
  ): (
    request: express.Request & Partial<AuthEnrichment>,
    _: express.Response,
    next: express.NextFunction
  ) => Promise<void> {
    return async (
      request: express.Request & Partial<AuthEnrichment>,
      _: express.Response,
      next: express.NextFunction
    ) => {
      const scopeVerifier = new ApiKeyScopeVerifier(verifier);
      const apiKeyHeader = (request.headers && request.headers['x-api-key']) || '';

      try {
        request.token = await scopeVerifier.scopedVerifiedApiKey(apiKeyHeader as string);
        console.log('test');
      } catch (error) {
        next(error);
        return;
      }

      next();
    };
  }

  /**
   * Returns an authentication middleware which checks the user's OAuth token of each request.
   */
  public getForUserToken(
    verifier: BearerTokenVerifier
  ): (
    request: express.Request & Partial<AuthEnrichment>,
    _: express.Response,
    next: express.NextFunction
  ) => Promise<void> {
    return async (
      request: express.Request & Partial<AuthEnrichment>,
      _: express.Response,
      next: express.NextFunction
    ) => {
      const scopeVerifier = new UserTokenScopeVerifier(verifier);
      const authorizationHeader = request.headers?.authorization || '';
      const sessionCookie = request.cookies.__session || '';

      try {
        request.token = await scopeVerifier.scopedVerifiedToken(authorizationHeader, sessionCookie);
      } catch (error) {
        next(error);
        return;
      }

      next();
    };
  }
}
