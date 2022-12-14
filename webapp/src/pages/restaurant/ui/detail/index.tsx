import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaceOfInterestUI } from '../../../places-of-interest/models/ui/place-of-interest';
import restaurantSender from '../../api/restaurant-sender';
import { restaurantMapper } from '../../restaurant-mapper';
import { Restaurant } from '../../models/domain/restaurant';
import { ReviewList } from '../../../components/review/ReviewList';
import AddReviewForm from './components/AddReviewForm';
import { Review } from '../../../components/models/domain/review';
import { StarRating } from '../../../components/StarRating';
import { Tooltip } from '@mui/material';
import { getRatingsTooltip } from '../../../components/helpers';

const MAX_REVIEWS_COUNT = 6;

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<PlaceOfInterestUI>();
  const [reviews, setReviews] = useState<Review[]>();

  // an empty array as dependency says that the 'useEffect' function will be run ONLY when the component mounts
  // Note: if there was no dependency, the function would run every time when the component re-renders
  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await restaurantSender.get(`/${id}`);

      if (!response || !response.data) {
        throw Error('Data received from the server is null');
      }

      const restaurantData = response.data.restaurants[0] as Restaurant;
      const reviewsData = response.data.reviews as Review[];
      setRestaurant(restaurantMapper(restaurantData));
      setReviews(reviewsData.slice(0, MAX_REVIEWS_COUNT));
    };

    fetchRestaurant().catch((error: Error) =>
      console.error('Error while fetching restaurant data', error)
    );
  }, []);

  return (
    <>
      {restaurant && (
        <div>
          <h1 style={{ textAlign: 'center' }}>Restaurant {restaurant.name}</h1>
          <div style={{ textAlign: 'center' }}>
            <Tooltip
              title={getRatingsTooltip(restaurant.averageRating ?? 0, restaurant.reviewCount ?? 0)}
            >
              <span>
                <StarRating
                  rating={restaurant.averageRating ?? 0}
                  reviewCount={restaurant.reviewCount ?? 0}
                />
              </span>
            </Tooltip>
          </div>
          {reviews && <ReviewList reviews={reviews} />}
          <AddReviewForm restaurantId={restaurant.id} />
        </div>
      )}
    </>
  );
};

export default RestaurantDetailPage;
