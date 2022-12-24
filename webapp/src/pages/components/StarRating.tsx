import React from 'react';
import { Rating, ThemeProvider } from '@mui/material';
import { reviewTheme } from './review/styles';

interface StarRatingProps {
  rating: number;
  voteCounts?: number;
}

export const StarRating = ({ rating, voteCounts }: StarRatingProps) => {
  return (
    <ThemeProvider theme={reviewTheme}>
      <Rating name="rating" value={rating} precision={0.1} readOnly />{' '}
      {voteCounts && `(${voteCounts})`}
    </ThemeProvider>
  );
};
