import { pino } from 'pino';

import { AuthToken } from '@local/auth/auth-token';
import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { Response } from '@local/interfaces/networking/response';
import { ReviewHandler } from '@local/domain/review/review-handler';

export class ReviewCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/restaurants/:id/reviews';

  public postHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'ReviewCollectionEndpoint postHandler');

    const handler = new ReviewHandler(logger);
    const restaurantId = request.urlParameters['id'];

    return handler.handlePost(restaurantId, request.body);
  }
}
