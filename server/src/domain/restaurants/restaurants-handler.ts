import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { Restaurant, PriceRange } from '@local/domain/restaurants/restaurant-model';
import { HttpResponseCode } from '@local/express/http/http-response-code';

export class RestaurantsHandler {
  public handleGet(id?: string): Promise<HandlerResponse<Restaurant | Restaurant[]>> {
    const restaurant = {
      id: '1',
      name: 'Domino Pizza',
      location: 'Berlin',
      priceRange: PriceRange.HIGH,
    };
    return Promise.resolve({
      code: HttpResponseCode.OK,
      payload: restaurant,
    });
  }

  public handlePost(body: Omit<Restaurant, 'id'>): Promise<HandlerResponse<Restaurant>> {
    const restaurant = {
      id: '1',
      name: 'Domino Pizza',
      location: 'Berlin',
      priceRange: PriceRange.HIGH,
    };
    return Promise.resolve({
      code: HttpResponseCode.CREATED,
      payload: restaurant,
    });
  }

  public handlePut(id: string, body: Restaurant): Promise<HandlerResponse<Restaurant>> {
    const restaurant = {
      id: '1',
      name: 'Domino Pizza',
      location: 'Berlin',
      priceRange: PriceRange.HIGH,
    };
    return Promise.resolve({
      code: HttpResponseCode.NO_CONTENT,
      payload: restaurant,
    });
  }

  public handleDelete(id: string): Promise<HandlerResponse<string>> {
    return Promise.resolve({
      code: HttpResponseCode.OK,
      payload: id,
    });
  }
}
