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

import { PRICE_RANGE_UI } from '../../../../places-of-interest/models/ui/price-range';

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
          <Button variant="contained" size="large" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddRestaurantForm;
