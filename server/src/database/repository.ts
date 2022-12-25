import { RestaurantRepository } from '@local/domain/restaurant/database/repository';
import { ReviewRepository } from '@local/domain/review/database/repository';

export interface DatabaseRepositories {
  restaurant?: RestaurantRepository;
  review?: ReviewRepository;
}
