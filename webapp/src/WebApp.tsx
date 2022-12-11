import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROOT, RESTAURANTS, NOT_FOUND } from './routes';
import PlacesOfInterestPage from './pages/places-of-interest';
import RestaurantDetailPage from './pages/restaurant/detail';
import RestaurantUpdatePage from './pages/restaurant/update';

const WebApp = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<PlacesOfInterestPage />} />
      <Route path={RESTAURANTS}>
        <Route path=":id" element={<RestaurantDetailPage />}>
          <Route path="update" element={<RestaurantUpdatePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={NOT_FOUND} replace />} />
    </Routes>
  );
};

export default WebApp;
