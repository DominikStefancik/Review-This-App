import { pino } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import database from '../../database-store';
import { Review } from '@local/domain/review/review-model';
import { INSERT_ONE_REVIEW } from '@local/domain/review/database/updates';

export class ReviewHandler {
  private readonly database = database;

  public constructor(private readonly logger: pino.Logger) {}

  public async handlePost(
    restaurantId: string,
    body: Omit<Review, 'id'>
  ): Promise<HandlerResponse<Review>> {
    this.logger.info({ body }, 'Handling POST request...');

    const { username, content, rating } = body;
    const insertResult = await this.database.query(INSERT_ONE_REVIEW, [
      restaurantId,
      username,
      content,
      rating,
    ]);
    const review = insertResult.rows[0] as Review;

    return {
      code: HttpResponseCode.CREATED,
      payload: review,
    };
  }
}
