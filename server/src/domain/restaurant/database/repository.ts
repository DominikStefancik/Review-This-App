import { pino } from 'pino';

import { Restaurant } from '@local/domain/restaurant/restaurant-model';
import {
  SELECT_RESTAURANT_BY_ID_WITH_REVIEW_STATISTICS,
  SELECT_ALL_RESTAURANTS_WITH_REVIEW_STATISTICS,
} from '@local/domain/restaurant/database/queries';
import {
  DELETE_ONE_RESTAURANT,
  UPDATE_ONE_RESTAURANT,
  INSERT_ONE_RESTAURANT,
} from '@local/domain/restaurant/database/updates';
import database from '@local/database/setup';

export class RestaurantRepository {
  private readonly database = database;

  public constructor(private readonly logger: pino.Logger) {}

  public async getAll(): Promise<Restaurant[]> {
    this.logger.info('Fetching all restaurants from the database...');

    const queryResult = await this.database.query(SELECT_ALL_RESTAURANTS_WITH_REVIEW_STATISTICS);

    return queryResult.rows as Restaurant[];
  }

  public async getOne(id: string): Promise<Restaurant> {
    this.logger.info({ id }, 'Fetching one restaurant from the database...');

    const queryResult = await this.database.query(SELECT_RESTAURANT_BY_ID_WITH_REVIEW_STATISTICS, [
      id,
    ]);

    return queryResult.rows[0] as Restaurant;
  }

  public async createOne(restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
    this.logger.info({ restaurant }, 'Saving a new restaurant to the database...');

    const { name, location, price_range } = restaurant;
    const insertResult = await this.database.query(INSERT_ONE_RESTAURANT, [
      name,
      location,
      price_range,
    ]);

    return insertResult.rows[0] as Restaurant;
  }

  public async updateOne(restaurant: Restaurant): Promise<Restaurant> {
    this.logger.info({ restaurant }, 'Updating a restaurant in the database...');

    const { id, name, location, price_range } = restaurant;
    const updateResult = await this.database.query(UPDATE_ONE_RESTAURANT, [
      name,
      location,
      price_range,
      id,
    ]);

    return updateResult.rows[0] as Restaurant;
  }

  public async deleteOne(id: string): Promise<void> {
    this.logger.info({ id }, 'Deleting one restaurant in the database...');

    await this.database.query(DELETE_ONE_RESTAURANT, [id]);
  }
}
