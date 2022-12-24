import React from 'react';
import { Grid, Box } from '@mui/material';

import { ReviewCard } from './ReviewCard';
import { Review } from '../models/domain/review';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: 10 }}>
        <Grid container spacing={3} columns={3}>
          {reviews.map((review) => (
            <Grid item key={review.id} xs={1}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
