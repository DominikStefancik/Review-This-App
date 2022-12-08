import { pino } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { Restaurant } from '@local/domain/restaurants/restaurant-model';
import { SELECT_BY_ID, SELECT_ALL } from '@local/domain/restaurants/database/queries';
import { INSERT_ONE, UPDATE_ONE, DELETE_ONE } from '@local/domain/restaurants/database/updates';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import database from '../../database-store';

export class RestaurantsHandler {
  private readonly database = database;

  public constructor(private readonly logger: pino.Logger) {}

  public async handleGet(id?: string): Promise<HandlerResponse<Restaurant | Restaurant[]>> {
    this.logger.info({ id }, 'Handling GET request...');

    let queryResult;

    if (id) {
      queryResult = await this.database.query(SELECT_BY_ID, [id]);
    } else {
      queryResult = await this.database.query(SELECT_ALL);
    }

    const restaurants = queryResult.rows as Restaurant[];

    return { code: HttpResponseCode.OK, payload: id ? restaurants[0] : restaurants };
  }

  public async handlePost(body: Omit<Restaurant, 'id'>): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ body }, 'Handling POST request...');

    const { name, location, price_range } = body;
    const insertResult = await this.database.query(INSERT_ONE, [name, location, price_range]);
    const restaurant = insertResult.rows[0] as Restaurant;

    return {
      code: HttpResponseCode.CREATED,
      payload: restaurant,
    };
  }

  public async handlePut(id: string, body: Restaurant): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ id, body }, 'Handling PUT request...');

    const { name, location, price_range } = body;
    const insertResult = await this.database.query(UPDATE_ONE, [name, location, price_range, id]);
    const restaurant = insertResult.rows[0] as Restaurant;

    return {
      code: HttpResponseCode.OK,
      payload: restaurant,
    };
  }

  public async handleDelete(id: string): Promise<HandlerResponse<any>> {
    this.logger.info({ id }, 'Handling DELETE request...');

    await this.database.query(DELETE_ONE, [id]);

    return {
      code: HttpResponseCode.NO_CONTENT,
      payload: {},
    };
  }
}
