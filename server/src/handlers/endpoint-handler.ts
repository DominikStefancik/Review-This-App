import { Logger } from 'pino';

import { AuthToken } from '@local/auth/auth-token';
import { Request } from '@local/handlers/request';
import { Response } from '@local/handlers/response';

export interface HandlerResponse<T> {
  code: number;
  payload: T;
}

export type EndpointHandler = (
  request: Request,
  token: AuthToken,
  logger: Logger
) => Promise<Response>;
