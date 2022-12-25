import { Pool } from 'pg';

import { PGDATABASE, PGHOST, PGPORT } from '../constants';

// connects to a PostgreSQL database
const pool = new Pool({
  user: '',
  host: PGHOST,
  database: PGDATABASE,
  password: '',
  port: Number(PGPORT),
});

const database = {
  query: (queryText: string, values?: any[]) => pool.query(queryText, values),
};

export default database;
