import { IRouter, Router } from 'express';

import { Endpoints } from '../../endpoints/endpoint';
import { ExpressAdapter, ExpressRequestHandler } from '../express-adapter';

export interface Route {
  root: string;
  endpoints: Endpoints[];
  middleware: ExpressRequestHandler[];
}

/**
 * Factory class creating a router with respective request handlers.
 */
export class RouterFactory {
  private readonly expressAdapter = new ExpressAdapter();

  /**
   * Returns an Express Router with routes and their request handlers defined in the {@link Route}
   * @param route
   */
  public getFor(route: Route): IRouter {
    const router = Router();

    route.middleware.forEach((middleware) => router.use(middleware));

    route.endpoints.forEach((endpoints) => {
      Object.entries(endpoints).forEach(([endpointName, endpoint]) => {
        const endpointRoute = router.route(endpointName);
        const { getHandler, postHandler, putHandler, patchHandler, deleteHandler } = endpoint;

        if (getHandler) {
          endpointRoute.get(this.expressAdapter.expressRequestHandler(endpoint, getHandler));
        }

        if (postHandler) {
          endpointRoute.post(this.expressAdapter.expressRequestHandler(endpoint, postHandler));
        }

        if (putHandler) {
          endpointRoute.put(this.expressAdapter.expressRequestHandler(endpoint, putHandler));
        }

        if (patchHandler) {
          endpointRoute.patch(this.expressAdapter.expressRequestHandler(endpoint, patchHandler));
        }

        if (deleteHandler) {
          endpointRoute.delete(this.expressAdapter.expressRequestHandler(endpoint, deleteHandler));
        }
      });
    });

    return router;
  }
}
