// At the very beginning of the index.ts file we need to setup an alias which will be used to avoid using relative paths in imports
import 'module-alias/register';

import * as express from 'express';

import { ExternalSystemApiVerifier } from '@local/auth/auth-verifier/external-system-api-verifier';
import { ExpressAppBuilder } from '@local/express/express-app-builder';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { AuthenticationMiddlewareFactory } from '@local/express/middleware/authentication-middleware-factory';
import { VersionTag } from '@local/express/routing/routes';

import { MODULE_NAME, PORT } from './constants';

import { getLogger } from './logging/logger';

if (!MODULE_NAME || !PORT) {
  throw new Error('Required environments variables are not set');
}

const logger = getLogger(MODULE_NAME);
const authenticationMiddlewareFactory = new AuthenticationMiddlewareFactory();
const externalSystemVerifier = new ExternalSystemApiVerifier(logger);

const app: express.Express = new ExpressAppBuilder(logger)
  .withPublicRoute('test', VersionTag.v1, [
    authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
  ])
  .withPublicRouteEndpoints('test', VersionTag.v1, {
    '/helloEndpoint': {
      getHandler: async (..._: any[]) => {
        return {
          payload: { message: 'Hello from the Express app' },
          code: HttpResponseCode.SUCCESS,
        };
      },
    },
  })
  .build();

app.listen(PORT, () => {
  logger.info(`Express server is listening on the port ${PORT}`);
});
