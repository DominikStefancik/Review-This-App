import { pino } from 'pino';

import database from '@local/database/setup';
import {
  DELETE_ALL_REVIEWS_BY_FOREIGN_KEY,
  INSERT_ONE_REVIEW,
} from '@local/domain/review/database/updates';
import { SELECT_REVIEWS_BY_FOREIGN_KEY } from '@local/domain/review/database/queries';
import { Review } from '@local/domain/review/review-model';

export class ReviewRepository {
  private readonly database = database;

  public constructor(private readonly logger: pino.Logger) {}

  public async getAllWithForeignKey(foreignKey: string): Promise<Review[]> {
    this.logger.info(
      { restaurantId: foreignKey },
      'Fetching all reviews from the database with the foreign key...'
    );

    const queryResult = await this.database.query(SELECT_REVIEWS_BY_FOREIGN_KEY, [foreignKey]);

    return queryResult.rows as Review[];
  }

  public async createOne(
    restaurantId: string,
    review: Omit<Review, 'id' | 'created_at'>
  ): Promise<Review> {
    this.logger.info({ restaurantId, review }, 'Saving a new review to the database...');

    const { username, content, rating } = review;
    const insertResult = await this.database.query(INSERT_ONE_REVIEW, [
      restaurantId,
      username,
      content,
      rating,
    ]);

    return insertResult.rows[0] as Review;
  }

  public async deleteAllWithForeignKey(foreignKey: string): Promise<void> {
    this.logger.info(
      { restaurantId: foreignKey },
      'Deleting all reviews in the database with the foreign key...'
    );

    await this.database.query(DELETE_ALL_REVIEWS_BY_FOREIGN_KEY, [foreignKey]);
  }
}
