import React, { useState } from 'react';
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
import { ROOT, ALL_RESTAURANTS } from '../../../../../routes';
import { PlaceOfInterestUI } from '../../../../places-of-interest/models/ui/place-of-interest';
import { useNavigate } from 'react-router-dom';

interface UpdateRestaurantFormProps {
  restaurant: PlaceOfInterestUI;
}

const UpdateRestaurantForm = ({ restaurant }: UpdateRestaurantFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [priceRange, setPriceRange] = useState(restaurant.priceRange.value.toString());

  const handleSubmit = async (id: string) => {
    try {
      const restaurantData = {
        id,
        name,
        location,
        price_range: priceRange,
      };

      await restaurantSender.put(`/${id}`, restaurantData);
      navigate(`${ROOT}${ALL_RESTAURANTS}`);
    } catch (error) {
      console.error('Error while creating a restaurant', error);
    }
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid container spacing={3} columns={10}>
        <Grid item xs={10}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
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
        <Grid container columnSpacing={3} item sx={{ justifyContent: 'right' }}>
          <Grid item xs={2}>
            <Button
              onClick={() => navigate(`${ROOT}${ALL_RESTAURANTS}`)}
              variant="outlined"
              size="large"
              fullWidth
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => handleSubmit(restaurant.id)}
              variant="contained"
              size="large"
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateRestaurantForm;
