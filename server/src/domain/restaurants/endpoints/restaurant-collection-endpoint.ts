import { pino } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { RestaurantsHandler } from '@local/domain/restaurants/restaurants-handler';
import { Response } from '@local/interfaces/networking/response';

export class RestaurantCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/restaurants';

  public getHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantCollectionEndpoint getHandler');

    const handler = new RestaurantsHandler();
    const restaurantId = request.urlParameters['id'];

    return handler.handleGet(restaurantId);
  }

  public postHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantCollectionEndpoint postHandler');

    const handler = new RestaurantsHandler();

    return handler.handlePost(request.body);
  }
}
