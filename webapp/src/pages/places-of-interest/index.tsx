import { Link } from 'react-router-dom';
import { RESTAURANTS } from '../../routes';
import React from 'react';

const PlacesOfInterestPage = () => {
  return (
    <div>
      <h1>Places of Interest</h1>
      <nav>
        <ul>
          <li>
            <Link to={`${RESTAURANTS}/1`}>Restaurant 1</Link>
          </li>
          <li>
            <Link to={`${RESTAURANTS}/2`}>Restaurant 2</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PlacesOfInterestPage;
