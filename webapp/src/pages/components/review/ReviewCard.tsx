import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Review } from '../models/domain/review';
import { StarRating } from '../StarRating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card>
      <CardHeader
        title={review.username}
        action={<StarRating rating={review.rating} />}
        sx={{ color: '#FFFFFF', backgroundColor: '#3792cb' }}
      />
      <CardContent sx={{ color: '#FFFFFF', backgroundColor: '#45b6fe' }}>
        {review.content}
      </CardContent>
    </Card>
  );
};
