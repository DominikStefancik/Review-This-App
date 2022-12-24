import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import restaurantSender from '../../api/restaurant-sender';
import { restaurantMapper } from '../../restaurant-mapper';
import { PlaceOfInterestUI } from '../../../places-of-interest/models/ui/place-of-interest';
import UpdateRestaurantForm from './components/UpdateRestaurantForm';
import { Restaurant } from '../../models/domain/restaurant';

const RestaurantUpdatePage = () => {
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

      const restaurantData = response.data.restaurants[0] as Restaurant;
      setRestaurant(restaurantMapper(restaurantData));
    };

    fetchRestaurant().catch((error: Error) =>
      console.error('Error while fetching restaurant data', error)
    );
  }, []);

  return (
    <>
      {restaurant && (
        <div>
          <h1>Update Restaurant {restaurant.name}</h1>
          <UpdateRestaurantForm restaurant={restaurant} />
        </div>
      )}
    </>
  );
};

export default RestaurantUpdatePage;
