import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import WebApp from './WebApp';
import { RestaurantContextProvider } from './context/RestaurantContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RestaurantContextProvider>
        <Routes>
          <Route path="/*" element={<WebApp />} />
        </Routes>
      </RestaurantContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
