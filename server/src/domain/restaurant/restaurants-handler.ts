import { pino } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { Restaurant } from '@local/domain/restaurant/restaurant-model';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { Review } from '@local/domain/review/review-model';
import { RestaurantRepository } from '@local/domain/restaurant/database/repository';
import { ReviewRepository } from '@local/domain/review/database/repository';
import { DatabaseRepositories } from '@local/database/repository';

export class RestaurantsHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'restaurant' | 'review'>,
    private readonly logger: pino.Logger
  ) {}

  private get restaurantRepository(): RestaurantRepository {
    return this.repositories.restaurant;
  }

  private get reviewRepository(): ReviewRepository {
    return this.repositories.review;
  }

  public async handleGet(
    id?: string
  ): Promise<HandlerResponse<{ restaurants: Restaurant[]; reviews: Review[] }>> {
    this.logger.info({ id }, 'Handling GET request...');

    let restaurants: Restaurant[];
    let reviews: Review[] = [];

    if (id) {
      restaurants = [await this.restaurantRepository.getOne(id)];
      reviews = await this.reviewRepository.getAllWithForeignKey(id);
    } else {
      restaurants = await this.restaurantRepository.getAll();
    }

    return { code: HttpResponseCode.OK, payload: { restaurants, reviews } };
  }

  public async handlePost(body: Omit<Restaurant, 'id'>): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ body }, 'Handling POST request...');

    const restaurant = await this.restaurantRepository.createOne(body);

    return {
      code: HttpResponseCode.CREATED,
      payload: restaurant,
    };
  }

  public async handlePut(id: string, body: Restaurant): Promise<HandlerResponse<Restaurant>> {
    this.logger.info({ id, body }, 'Handling PUT request...');

    const restaurant = await this.restaurantRepository.updateOne(body);

    return {
      code: HttpResponseCode.OK,
      payload: restaurant,
    };
  }

  public async handleDelete(id: string): Promise<HandlerResponse<any>> {
    this.logger.info({ id }, 'Handling DELETE request...');

    // first we have to delete all reviews referencing the restaurant
    await this.reviewRepository.deleteAllWithForeignKey(id);
    await this.restaurantRepository.deleteOne(id);

    return {
      code: HttpResponseCode.NO_CONTENT,
      payload: {},
    };
  }
}
