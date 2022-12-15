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
  // generates number real number between 0 and 5
  let randomRating = Math.random() * (5 - 0) + 0;
  // rounds number to 1 decimal place
  randomRating = Math.round(randomRating * 10) / 10;

  return {
    name: restaurant.name,
    type: PlaceOfInterestType.Restaurant,
    location: restaurant.location,
    priceRange: getPriceRange(restaurant.price_range),
    ratings: randomRating,
  };
};
