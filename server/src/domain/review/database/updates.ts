export const INSERT_ONE_REVIEW =
  // 'returning' says PostgreSQL to return all fields of a newly inserted row
  'INSERT INTO review (restaurant_id, username, content, rating) VALUES ($1, $2, $3, $4) RETURNING *';

export const DELETE_ONE_REVIEW = 'DELETE FROM review WHERE id = $1';

export const DELETE_ALL_REVIEWS_BY_FOREIGN_KEY = 'DELETE FROM review WHERE restaurant_id = $1';
