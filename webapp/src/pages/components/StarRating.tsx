import React from 'react';
import { Rating, ThemeProvider } from '@mui/material';
import { reviewTheme } from './review/styles';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

export const StarRating = ({ rating, reviewCount }: StarRatingProps) => {
  return (
    <ThemeProvider theme={reviewTheme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Rating name="rating" value={rating} precision={0.1} readOnly />
        &nbsp;
        <span style={{ color: '#faaf00' }}>{reviewCount !== undefined && `(${reviewCount})`}</span>
      </div>
    </ThemeProvider>
  );
};
