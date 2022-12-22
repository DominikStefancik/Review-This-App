import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaceOfInterestUI } from '../../../places-of-interest/models/ui/place-of-interest';
import restaurantSender from '../../api/restaurant-sender';
import { restaurantMapper } from '../../restaurant-mapper';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<PlaceOfInterestUI>();

  // an empty array as dependency says that the 'useEffect' function will be run ONLY when the component mounts
  // Note: if there was no dependency, the function would run every time when the component re-renders
  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await restaurantSender.get(`/${id}`);

      if (!response || !response.data) {
        throw Error('Data received from the server is null');
      }

      setRestaurant(restaurantMapper(response.data));
    };

    fetchRestaurant().catch((error: Error) =>
      console.error('Error while fetching restaurant data', error)
    );
  }, []);

  return (
    <>
      {restaurant && (
        <div>
          <h1>Restaurant {restaurant.name}</h1>
        </div>
      )}
    </>
  );
};

export default RestaurantDetailPage;
