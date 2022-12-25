import { pino } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { Review } from '@local/domain/review/review-model';
import { ReviewRepository } from '@local/domain/review/database/repository';

export class ReviewHandler {
  public constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly logger: pino.Logger
  ) {}

  public async handlePost(
    restaurantId: string,
    body: Omit<Review, 'id'>
  ): Promise<HandlerResponse<Review>> {
    this.logger.info({ body }, 'Handling POST request...');

    const review = await this.reviewRepository.createOne(restaurantId, body);

    return {
      code: HttpResponseCode.CREATED,
      payload: review,
    };
  }
}
