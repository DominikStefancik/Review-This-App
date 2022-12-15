import React, { useEffect, useContext } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Rating,
  Tooltip,
} from '@mui/material';

import restaurantSender from '../../../api/restaurant-sender';
import { RestaurantContext } from '../../../../../context/RestaurantContextProvider';
import { restaurantMapper } from '../../../restaurant-mapper';
import { PlaceOfInterestUI } from '../../../../places-of-interest/models/ui/place-of-interest';

const priceRangeSymbol = '$';
const stringifyPriceRangeValue = (value: number): string => {
  return priceRangeSymbol.padStart(value, priceRangeSymbol);
};

const getRatingsTooltip = (value: number, votesCount: number) => {
  return `${value} out of 5 (${votesCount} votes)`;
};

const RestaurantTable = () => {
  // @ts-ignore
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  // an empty array as dependency says that the 'useEffect' function will be run ONLY when the component mounts
  // Note: if there was no dependency, the function would run every time when the component re-renders
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await restaurantSender.get('/');
      const transformedData = response.data.map(restaurantMapper);
      setRestaurants(transformedData);
    };

    fetchRestaurants().catch((error: Error) =>
      console.error('Error while fetching restaurant data', error)
    );
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 10 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Price Range</TableCell>
            <TableCell align="left">Ratings</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((restaurant: PlaceOfInterestUI, index: number) => {
            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell align="left">{restaurant.type}</TableCell>
                <TableCell align="left">{restaurant.location}</TableCell>
                <TableCell align="left">
                  <Tooltip title={restaurant.priceRange.tooltip}>
                    <span>{stringifyPriceRangeValue(restaurant.priceRange.value)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <Tooltip title={getRatingsTooltip(restaurant.ratings, 4)}>
                    <span>
                      <Rating name="rating" value={restaurant.ratings} precision={0.1} readOnly />
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" size="large" fullWidth color="success">
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" size="large" fullWidth color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantTable;
