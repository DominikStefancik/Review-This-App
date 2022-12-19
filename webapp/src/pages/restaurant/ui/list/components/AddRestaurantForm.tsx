import React, { useState, useContext } from 'react';
import {
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';

import { PRICE_RANGE_UI } from '../../../../places-of-interest/models/ui/price-range';
import restaurantSender from '../../../api/restaurant-sender';
import { RestaurantContext } from '../../../../../context/RestaurantContextProvider';
import { restaurantMapper } from '../../../restaurant-mapper';

const AddRestaurantForm = () => {
  // @ts-ignore
  const { addRestaurant } = useContext(RestaurantContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const restaurantData = {
        name,
        location,
        price_range: priceRange,
      };
      const response = await restaurantSender.post('/', restaurantData);
      addRestaurant(restaurantMapper(response.data));

      setName('');
      setLocation('');
      setPriceRange('');
    } catch (error) {
      console.error('Error while creating a restaurant', error);
    }
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid container spacing={2} columns={10}>
        <Grid item xs={3}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="price-range-label">Price Range</InputLabel>
            <Select
              labelId="price-range-label"
              id="price-range"
              label="Price Range"
              value={priceRange}
              onChange={(event: SelectChangeEvent) => setPriceRange(event.target.value)}
            >
              <MenuItem value={PRICE_RANGE_UI.veryLow.value}>
                {PRICE_RANGE_UI.veryLow.label}
              </MenuItem>
              <MenuItem value={PRICE_RANGE_UI.low.value}>{PRICE_RANGE_UI.low.label}</MenuItem>
              <MenuItem value={PRICE_RANGE_UI.medium.value}>{PRICE_RANGE_UI.medium.label}</MenuItem>
              <MenuItem value={PRICE_RANGE_UI.high.value}>{PRICE_RANGE_UI.high.label}</MenuItem>
              <MenuItem value={PRICE_RANGE_UI.veryHigh.value}>
                {PRICE_RANGE_UI.veryHigh.label}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleSubmit} variant="contained" size="large" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddRestaurantForm;
