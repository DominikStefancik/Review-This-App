import React from 'react';

import Header from './components/Header';
import AddRestaurantForm from './components/AddRestaurantForm';
import RestaurantTable from './components/RestaurantTable';

const RestaurantListPage = () => {
  return (
    <div>
      <Header />
      <AddRestaurantForm />
      <RestaurantTable />
    </div>
  );
};

export default RestaurantListPage;
