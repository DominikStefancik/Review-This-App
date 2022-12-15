import { createContext, useState } from 'react';

export const RestaurantContext = createContext({});

interface RestaurantContextProviderProps {
  children: React.ReactNode;
}

export const RestaurantContextProvider = ({ children }: RestaurantContextProviderProps) => {
  const [restaurants, setRestaurants] = useState([]);

  return (
    // the value represents a context object with attributes which will be available to all components
    // also pass the 'setRestaurants' function so we can update the restaurants in any component
    <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
