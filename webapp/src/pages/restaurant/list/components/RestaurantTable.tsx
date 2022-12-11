import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Rating,
  Tooltip,
} from '@mui/material';

import { PlaceOfInterestType } from '../../../../models/place-of-interest';
import { PRICE_RANGE } from '../../../../models/price-range';

const priceRangeSymbol = '$';
const stringifyPriceRangeValue = (value: number): string => {
  return priceRangeSymbol.padStart(value, priceRangeSymbol);
};

const getRatingsTooltip = (value: number, votesCount: number) => {
  return `${value} out of 5 (${votesCount} votes)`;
};

const rows = [
  {
    name: 'Domino Pizza',
    type: PlaceOfInterestType.Restaurant,
    location: 'Berlin',
    priceRange: PRICE_RANGE.medium,
    ratings: 3.8,
  },
  {
    name: 'KFC',
    type: PlaceOfInterestType.Restaurant,
    location: 'Stuttgart',
    priceRange: PRICE_RANGE.high,
    ratings: 2.9,
  },
  {
    name: 'MacDonalds',
    type: PlaceOfInterestType.Restaurant,
    location: 'Munich',
    priceRange: PRICE_RANGE.veryLow,
    ratings: 2.5,
  },
  {
    name: 'Asia Garden',
    type: PlaceOfInterestType.Restaurant,
    location: 'Hamburg',
    priceRange: PRICE_RANGE.low.value,
    ratings: 4.1,
  },
  {
    name: 'Rustico',
    type: PlaceOfInterestType.Restaurant,
    location: 'Chemnitz',
    priceRange: PRICE_RANGE.high,
    ratings: 3.7,
  },
  {
    name: 'Seven Oaks',
    type: PlaceOfInterestType.Restaurant,
    location: 'Frankfurt',
    priceRange: PRICE_RANGE.veryHigh,
    ratings: 4.6,
  },
  {
    name: 'Mamas and Papas',
    type: PlaceOfInterestType.Restaurant,
    location: 'Rostock',
    priceRange: PRICE_RANGE.medium,
    ratings: 3.2,
  },
];
const RestaurantTable = () => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 10 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Price Range</TableCell>
            <TableCell align="left">Ratings</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => {
            return (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">
                  <Tooltip title={row.priceRange.tooltip}>
                    <span>{stringifyPriceRangeValue(row.priceRange.value)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <Tooltip title={getRatingsTooltip(row.ratings, 4)}>
                    <span>
                      <Rating name="rating" value={row.ratings} precision={0.1} readOnly />
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" size="large" fullWidth color="success">
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" size="large" fullWidth color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantTable;
