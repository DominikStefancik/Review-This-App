import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROOT, RESTAURANTS, NOT_FOUND, ALL_PLACES } from './routes';
import PlacesOfInterestPage from './pages/places-of-interest';
import RestaurantDetailPage from './pages/restaurant/detail';
import RestaurantUpdatePage from './pages/restaurant/update';
import Layout from './pages/components/Layout';
import RestaurantListPage from './pages/restaurant/list';

const WebApp = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<Layout />}>
        <Route index element={<PlacesOfInterestPage />} />
        <Route path={ALL_PLACES} element={<PlacesOfInterestPage />} />
        <Route path={RESTAURANTS} element={<RestaurantListPage />}>
          <Route path=":id" element={<RestaurantDetailPage />}>
            <Route path="update" element={<RestaurantUpdatePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={NOT_FOUND} replace />} />
      </Route>
    </Routes>
  );
};

export default WebApp;
