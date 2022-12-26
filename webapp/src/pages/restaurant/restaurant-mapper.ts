import { Restaurant, PriceRange } from './models/domain/restaurant';
import { PlaceOfInterestUI } from '../places-of-interest/models/ui/place-of-interest';
import { PRICE_RANGE_UI } from '../places-of-interest/models/ui/price-range';
import { PlaceOfInterestType } from '../places-of-interest/models/domain/place-of-interest';

const getPriceRange = (priceRange: PriceRange) => {
  switch (priceRange) {
    case PriceRange.VERY_LOW:
      return PRICE_RANGE_UI.veryLow;
    case PriceRange.LOW:
      return PRICE_RANGE_UI.low;
    case PriceRange.MEDIUM:
      return PRICE_RANGE_UI.medium;
    case PriceRange.HIGH:
      return PRICE_RANGE_UI.high;
    case PriceRange.VERY_HIGH:
      return PRICE_RANGE_UI.veryHigh;
  }
};

// maps a domain restaurant (from DB) to an object for UI rendering
export const restaurantMapper = (restaurant: Restaurant): PlaceOfInterestUI => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    type: PlaceOfInterestType.Restaurant,
    location: restaurant.location,
    priceRange: getPriceRange(restaurant.price_range),
    reviewCount: restaurant.review_count,
    averageRating: restaurant.average_rating,
  };
};
