import * as express from 'express';
import { v4 } from 'uuid';

import { Endpoint } from '../endpoints/endpoint';
import { EndpointHandler } from '../handlers/endpoint-handler';
import { AuthEnrichment } from '../handlers/request';
import { LoggerEnrichment } from './middleware/logging-middleware-factory';

/**
 * Represents a handler for incoming requests
 */
export type ExpressRequestHandler = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => Promise<void>;

/**
 * Class creating handlers for Express requests
 */
export class ExpressAdapter {
  public expressRequestHandler(
    endpoint: Endpoint,
    handler: EndpointHandler
  ): ExpressRequestHandler {
    return async (
      request: express.Request & Partial<AuthEnrichment> & Partial<LoggerEnrichment>,
      response: express.Response,
      next: express.NextFunction
    ) => {
      if (!request.token || !request.logger) {
        next(new Error('Middleware setup is faulty. Token or logger is not set up'));
        return;
      }

      let payload;
      let code;

      try {
        ({ code, payload } = await handler.call(
          endpoint,
          {
            body: request.body,
            lowercaseHeaders: request.headers,
            urlParameters: request.params,
            queryParameters: request.query,
            // correlationId is for inter-service communication
            correlationId: request.correlationId || v4(),
          },
          request.token,
          request.logger
        ));
      } catch (error) {
        next(error);
        return;
      }

      response.status(code).json(payload);
    };
  }
}
