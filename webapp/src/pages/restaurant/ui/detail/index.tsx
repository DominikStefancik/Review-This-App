import React from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  return <h1>Restaurant Detail {id}</h1>;
};

export default RestaurantDetailPage;
