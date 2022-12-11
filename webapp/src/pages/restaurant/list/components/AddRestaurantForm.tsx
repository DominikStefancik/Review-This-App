import React from 'react';
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

import { PRICE_RANGE } from '../../../../models/price-range';

const AddRestaurantForm = () => {
  const [priceRange, setPriceRange] = React.useState('');

  const handlePriceChange = (event: SelectChangeEvent) => {
    setPriceRange(event.target.value);
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid container spacing={2} columns={10}>
        <Grid item xs={3}>
          <TextField id="name" label="Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField id="location" label="Location" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="price-range-label">Price Range</InputLabel>
            <Select
              labelId="price-range-label"
              id="price-range"
              label="Price Range"
              value={priceRange}
              onChange={handlePriceChange}
            >
              <MenuItem value={PRICE_RANGE.veryLow.value}>{PRICE_RANGE.veryLow.label}</MenuItem>
              <MenuItem value={PRICE_RANGE.low.value}>{PRICE_RANGE.low.label}</MenuItem>
              <MenuItem value={PRICE_RANGE.medium.value}>{PRICE_RANGE.medium.label}</MenuItem>
              <MenuItem value={PRICE_RANGE.high.value}>{PRICE_RANGE.high.label}</MenuItem>
              <MenuItem value={PRICE_RANGE.veryHigh.value}>{PRICE_RANGE.veryHigh.label}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" size="large" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddRestaurantForm;
