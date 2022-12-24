import { pino } from 'pino';

import { AuthToken } from '@local/auth/auth-token';
import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { RestaurantsHandler } from '@local/domain/restaurant/restaurants-handler';
import { Response } from '@local/interfaces/networking/response';

export class RestaurantCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/restaurants';

  public getHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantCollectionEndpoint getHandler');

    const handler = new RestaurantsHandler(logger);

    return handler.handleGet();
  }

  public postHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantCollectionEndpoint postHandler');

    const handler = new RestaurantsHandler(logger);

    return handler.handlePost(request.body);
  }
}
