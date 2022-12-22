import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  ROOT,
  ALL_RESTAURANTS,
  NOT_FOUND,
  ALL_PLACES,
  RESTAURANT_UPDATE,
  RESTAURANT_DETAIL,
} from './routes';
import PlacesOfInterestPage from './pages/places-of-interest';
import RestaurantDetailPage from './pages/restaurant/ui/detail';
import RestaurantUpdatePage from './pages/restaurant/ui/update';
import Layout from './pages/components/Layout';
import RestaurantListPage from './pages/restaurant/ui/list';

const WebApp = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<Layout />}>
        <Route index element={<PlacesOfInterestPage />} />
        <Route path={ALL_PLACES} element={<PlacesOfInterestPage />} />
        <Route path={ALL_RESTAURANTS} element={<RestaurantListPage />} />
        <Route path={RESTAURANT_DETAIL} element={<RestaurantDetailPage />} />
        <Route path={RESTAURANT_UPDATE} element={<RestaurantUpdatePage />} />
        <Route path="*" element={<Navigate to={NOT_FOUND} replace />} />
      </Route>
    </Routes>
  );
};

export default WebApp;
