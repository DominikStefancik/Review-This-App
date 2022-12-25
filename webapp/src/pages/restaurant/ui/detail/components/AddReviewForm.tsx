import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  TextareaAutosize,
} from '@mui/material';

import { ROOT, ALL_RESTAURANTS } from '../../../../../routes';
import { PRICE_RANGE_UI } from '../../../../places-of-interest/models/ui/price-range';
import restaurantSender from '../../../api/restaurant-sender';

interface UpdateRestaurantFormProps {
  restaurantId: string;
}

const AddReviewForm = ({ restaurantId }: UpdateRestaurantFormProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      const reviewData = {
        restaurantId,
        username,
        content,
        rating,
      };

      await restaurantSender.post(`/${restaurantId}/reviews`, reviewData);
      navigate(`${ROOT}${ALL_RESTAURANTS}`);
    } catch (error) {
      console.error('Error while creating a review', error);
    }
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid container spacing={3} columns={10}>
        <Grid item xs={8}>
          <TextField
            id="username"
            label="User Name"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              id="rating"
              label="Rating"
              value={rating}
              onChange={(event: SelectChangeEvent) => setRating(event.target.value)}
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
        <Grid item xs={10}>
          <TextareaAutosize
            id="content"
            aria-label="Content"
            minRows={10}
            placeholder="Add review here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            style={{
              boxSizing: 'border-box',
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              borderColor: '#C0C0C0',
              borderRadius: '4px',
              padding: '16.5px',
              marginRight: '4px',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
            }}
          />
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
            <Button onClick={handleSubmit} variant="contained" size="large" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddReviewForm;
