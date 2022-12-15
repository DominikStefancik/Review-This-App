export enum PriceRange {
  VERY_LOW = 1,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

// represents a Restaurant domain data as it is received from the backend
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  price_range: PriceRange;
}
