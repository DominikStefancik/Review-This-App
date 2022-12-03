import * as express from 'express';
import { Logger } from 'pino';

import { InternalServerError } from '../http/http-errors';
import { HttpResponseCode } from '../http/http-response-code';

export function internalServerErrorHandler(
  error: InternalServerError,
  request: express.Request & { logger?: Logger },
  response: express.Response,
  next: express.NextFunction
) {
  if (error.constructor !== InternalServerError) {
    next(error);
    return;
  }

  if (request.logger) {
    request.logger.warn(
      `Handling error as ${HttpResponseCode.INTERNAL_SERVER_ERROR}`,
      error.json()
    );
  }

  response
    .status(HttpResponseCode.INTERNAL_SERVER_ERROR)
    .json({ code: HttpResponseCode.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
}
