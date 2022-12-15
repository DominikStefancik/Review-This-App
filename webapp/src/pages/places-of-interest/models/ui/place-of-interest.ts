import { PlaceOfInterestType } from '../domain/place-of-interest';
import { PriceRangeUI } from './price-range';

export interface PlaceOfInterestUI {
  name: string;
  type: PlaceOfInterestType;
  location: string;
  priceRange: PriceRangeUI;
  ratings: number;
}
