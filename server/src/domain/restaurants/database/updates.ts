export const INSERT_ONE =
  // 'returning' says PostgreSQL to return all fields of a newly inserted row
  'INSERT INTO restaurant (name, location, price_range) VALUES ($1, $2, $3) RETURNING *';

export const UPDATE_ONE =
  // 'returning' says PostgreSQL to return all fields of an updated row
  'UPDATE restaurant SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *';

export const DELETE_ONE = 'DELETE FROM restaurant WHERE id = $1';
