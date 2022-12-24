export enum PriceRange {
  VERY_LOW = 1,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  price_range: PriceRange;
}
