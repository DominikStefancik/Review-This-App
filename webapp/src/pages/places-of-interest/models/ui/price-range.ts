export interface PriceRangeUI {
  value: number;
  label: string;
  tooltip: string;
}

export const PRICE_RANGE_UI: { [range: string]: PriceRangeUI } = {
  veryLow: {
    value: 1,
    label: '$ (Very Low)',
    tooltip: 'Very Low',
  },
  low: {
    value: 2,
    label: '$$ (Low)',
    tooltip: 'Low',
  },
  medium: {
    value: 3,
    label: '$$$ (Medium)',
    tooltip: 'Medium',
  },
  high: {
    value: 4,
    label: '$$$$ (High)',
    tooltip: 'High',
  },
  veryHigh: {
    value: 5,
    label: '$$$$$ (Very High)',
    tooltip: 'Very High',
  },
};
