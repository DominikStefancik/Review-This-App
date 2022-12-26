import { PlaceOfInterestType } from '../domain/place-of-interest';
import { PriceRangeUI } from './price-range';

export interface PlaceOfInterestUI {
  id: string;
  name: string;
  type: PlaceOfInterestType;
  location: string;
  priceRange: PriceRangeUI;
  reviewCount: number | null;
  averageRating: number | null;
}
