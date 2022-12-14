import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tooltip,
  ThemeProvider,
} from '@mui/material';

import restaurantSender from '../../../api/restaurant-sender';
import { RestaurantContext } from '../../../../../context/RestaurantContextProvider';
import { restaurantMapper } from '../../../restaurant-mapper';
import { PlaceOfInterestUI } from '../../../../places-of-interest/models/ui/place-of-interest';
import { ALL_RESTAURANTS } from '../../../../../routes';
import { restaurantTableTheme } from '../styles';
import { StarRating } from '../../../../components/StarRating';
import { Restaurant } from '../../../models/domain/restaurant';
import { getRatingsTooltip } from '../../../../components/helpers';

const priceRangeSymbol = '$';
const stringifyPriceRangeValue = (value: number): string => {
  return priceRangeSymbol.padStart(value, priceRangeSymbol);
};

const RestaurantTable = () => {
  // @ts-ignore
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();

  // an empty array as dependency says that the 'useEffect' function will be run ONLY when the component mounts
  // Note: if there was no dependency, the function would run every time when the component re-renders
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await restaurantSender.get('/');
      const restaurantsData = response.data.restaurants as Restaurant[];
      const transformedData = restaurantsData.map(restaurantMapper);
      setRestaurants(transformedData);
    };

    fetchRestaurants().catch((error: Error) =>
      console.error('Error while fetching restaurant data', error)
    );
  }, []);

  const handleUpdate = (event: any, restaurantId: string) => {
    // when we click a button, we don't want the event to be propagated up to the table row, so it won't react to it
    event.stopPropagation();

    navigate(`/${ALL_RESTAURANTS}/${restaurantId}/update`);
  };

  const handleDelete = async (event: any, restaurantId: string) => {
    // when we click on button, we don't want the event to be propagated up to the table row, so it won't react to it
    event.stopPropagation();

    try {
      await restaurantSender.delete(`/${restaurantId}`);
      setRestaurants(
        restaurants.filter((restaurant: PlaceOfInterestUI) => restaurant.id !== restaurantId)
      );
    } catch (error) {
      console.error(`Error while deleting a restaurant (id=${restaurantId})`, error);
    }
  };

  const handleRowClick = (restaurantId: string) => {
    navigate(`/${ALL_RESTAURANTS}/${restaurantId}`);
  };

  return (
    <ThemeProvider theme={restaurantTableTheme}>
      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Price Range</TableCell>
              <TableCell align="left">Ratings</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant: PlaceOfInterestUI, index: number) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    ':hover': { cursor: 'pointer' },
                  }}
                  onClick={(event) => handleRowClick(restaurant.id)}
                >
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell align="left">{restaurant.type}</TableCell>
                  <TableCell align="left">{restaurant.location}</TableCell>
                  <TableCell align="left">
                    <Tooltip title={restaurant.priceRange.tooltip}>
                      <span>{stringifyPriceRangeValue(restaurant.priceRange.value)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#FAAF00' }}>
                    {restaurant.averageRating && restaurant.reviewCount ? (
                      <Tooltip
                        title={getRatingsTooltip(restaurant.averageRating, restaurant.reviewCount)}
                      >
                        <span>
                          <StarRating
                            rating={restaurant.averageRating}
                            reviewCount={restaurant.reviewCount}
                          />
                        </span>
                      </Tooltip>
                    ) : (
                      '0 reviews'
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      sx={{
                        'color': '#303030',
                        'backgroundColor': '#FFBF00',
                        ':hover': { backgroundColor: '#F8DE7E' },
                      }}
                      onClick={(event) => handleUpdate(event, restaurant.id)}
                      variant="contained"
                      size="large"
                      fullWidth
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      sx={{
                        'backgroundColor': '#E32636',
                        ':hover': { backgroundColor: '#E46B71' },
                      }}
                      onClick={(event) => handleDelete(event, restaurant.id)}
                      variant="contained"
                      size="large"
                      fullWidth
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default RestaurantTable;
