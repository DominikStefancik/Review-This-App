export const SELECT_REVIEWS_BY_FOREIGN_KEY =
  'SELECT * FROM review WHERE restaurant_id = $1 ORDER BY created_at DESC';
