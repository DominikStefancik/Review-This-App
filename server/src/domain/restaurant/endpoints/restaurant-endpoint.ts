import { pino } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { RestaurantsHandler } from '@local/domain/restaurant/restaurants-handler';
import { Response } from '@local/interfaces/networking/response';
import { RestaurantRepository } from '@local/domain/restaurant/database/repository';
import { ReviewRepository } from '@local/domain/review/database/repository';

export class RestaurantEndpoint implements Endpoint {
  public static readonly PATH = '/restaurants/:id';

  public getHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantEndpoint getHandler');

    const repositories = {
      restaurant: new RestaurantRepository(logger),
      review: new ReviewRepository(logger),
    };
    const handler = new RestaurantsHandler(repositories, logger);
    const restaurantId = request.urlParameters['id'];

    return handler.handleGet(restaurantId);
  }

  public putHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantEndpoint putHandler');

    const repositories = {
      restaurant: new RestaurantRepository(logger),
    };
    const handler = new RestaurantsHandler(repositories, logger);
    const restaurantId = request.urlParameters['id'];

    return handler.handlePut(restaurantId, request.body);
  }

  public deleteHandler(
    request: Request,
    authToken: AuthToken,
    logger: pino.Logger
  ): Promise<Response> {
    logger.info({ request }, 'RestaurantEndpoint deleteHandler');

    const repositories = {
      restaurant: new RestaurantRepository(logger),
      review: new ReviewRepository(logger),
    };
    const handler = new RestaurantsHandler(repositories, logger);
    const restaurantId = request.urlParameters['id'];

    return handler.handleDelete(restaurantId);
  }
}
