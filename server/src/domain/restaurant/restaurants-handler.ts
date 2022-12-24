import { pino } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { Restaurant } from '@local/domain/restaurant/restaurant-model';
import {
  SELECT_RESTAURANT_BY_ID,
  SELECT_ALL_RESTAURANTS,
} from '@local/domain/restaurant/database/queries';
import {
  INSERT_ONE_RESTAURANT,
  UPDATE_ONE_RESTAURANT,
  DELETE_ONE_RESTAURANT,
} from '@local/domain/restaurant/database/updates';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import database from '../../database-store';
import { SELECT_REVIEWS_BY_FOREIGN_KEY } from '@local/domain/review/database/queries';
import { Review } from '@local/domain/review/review-model';

export class RestaurantsHandler {
  private readonly database = database;

  public constructor(private readonly logger: pino.Logger) {}

  public async handleGet(
    id?: string
  ): Promise<HandlerResponse<{ restaurants: Restaurant[]; reviews: Review[] }>> {
    this.logger.info({ id }, 'Handling GET request...');

    let restaurantQueryResult;
    let reviewQueryResult;

    if (id) {
      restaurantQueryResult = await this.database.query(SELECT_RESTAURANT_BY_ID, [id]);
      reviewQueryResult = await this.database.query(SELECT_REVIEWS_BY_FOREIGN_KEY, [id]);
    } else {
      restaurantQueryResult = await this.database.query(SELECT_ALL_RESTAURANTS);
    }

    const restaurants = restaurantQueryResult.rows as Restaurant[];
    const reviews = reviewQueryResult ? (reviewQueryResult.rows as Review[]) : [];

    return { code: HttpResponseCode.OK, payload: { restaurants, reviews } };
  }

  public async handlePost(body: Omit<Restaurant, 'id'>): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ body }, 'Handling POST request...');

    const { name, location, price_range } = body;
    const insertResult = await this.database.query(INSERT_ONE_RESTAURANT, [
      name,
      location,
      price_range,
    ]);
    const restaurant = insertResult.rows[0] as Restaurant;

    return {
      code: HttpResponseCode.CREATED,
      payload: restaurant,
    };
  }

  public async handlePut(id: string, body: Restaurant): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ id, body }, 'Handling PUT request...');

    const { name, location, price_range } = body;
    const insertResult = await this.database.query(UPDATE_ONE_RESTAURANT, [
      name,
      location,
      price_range,
      id,
    ]);
    const restaurant = insertResult.rows[0] as Restaurant;

    return {
      code: HttpResponseCode.OK,
      payload: restaurant,
    };
  }

  public async handleDelete(id: string): Promise<HandlerResponse<any>> {
    this.logger.info({ id }, 'Handling DELETE request...');

    await this.database.query(DELETE_ONE_RESTAURANT, [id]);

    return {
      code: HttpResponseCode.NO_CONTENT,
      payload: {},
    };
  }
}
