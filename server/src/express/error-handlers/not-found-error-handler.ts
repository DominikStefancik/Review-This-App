import * as express from 'express';
import { Logger } from 'pino';

import { NotFoundError } from '../http/http-errors';
import { HttpResponseCode } from '../http/http-response-code';

export function notFoundErrorHandler(
  error: NotFoundError,
  request: express.Request & { logger?: Logger },
  response: express.Response,
  next: express.NextFunction
) {
  if (error.constructor !== NotFoundError) {
    next(error);
    return;
  }

  if (request.logger) {
    request.logger.warn(`Handling error as ${HttpResponseCode.NOT_FOUND}`, error.json());
  }

  if (error.responseMessage) {
    response
      .status(HttpResponseCode.NOT_FOUND)
      .json({ code: HttpResponseCode.NOT_FOUND, message: `Not found: ${error.responseMessage}` });
  } else {
    response
      .status(HttpResponseCode.NOT_FOUND)
      .json({ code: HttpResponseCode.NOT_FOUND, message: 'Not found' });
  }
}
