import * as express from 'express';
import { Logger } from 'pino';

import { InvalidRequestError } from '../http/http-errors';
import { HttpResponseCode } from '../http/http-response-code';

export function invalidRequestErrorHandler(
  error: InvalidRequestError,
  request: express.Request & { logger?: Logger },
  response: express.Response,
  next: express.NextFunction
) {
  if (error.constructor !== InvalidRequestError) {
    next(error);
    return;
  }

  if (request.logger) {
    request.logger.warn(`Handling error as ${HttpResponseCode.BAD_REQUEST}`, error.json());
  }

  if (error.responseMessage) {
    response.status(HttpResponseCode.BAD_REQUEST).json({
      code: HttpResponseCode.BAD_REQUEST,
      message: `Invalid request: ${error.responseMessage}`,
    });
  } else {
    response
      .status(HttpResponseCode.BAD_REQUEST)
      .json({ code: HttpResponseCode.BAD_REQUEST, message: 'Invalid request' });
  }
}
