import { createContext, useState } from 'react';
import { PlaceOfInterestUI } from '../pages/places-of-interest/models/ui/place-of-interest';

export const RestaurantContext = createContext({});

interface RestaurantContextProviderProps {
  children: React.ReactNode;
}

export const RestaurantContextProvider = ({ children }: RestaurantContextProviderProps) => {
  const [restaurants, setRestaurants] = useState<PlaceOfInterestUI[]>([]);

  const addRestaurant = (restaurant: PlaceOfInterestUI) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    // the value represents a context object with attributes which will be available to all components
    // also pass the 'setRestaurants' function so we can update the restaurants in any component
    <RestaurantContext.Provider value={{ restaurants, setRestaurants, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};
