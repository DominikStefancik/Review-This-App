import { Pool, types } from 'pg';

import { PGDATABASE, PGHOST, PGPORT } from '../constants';

// this value is defined in the 'pg-types' in the 'TypeId' enum
// but we cannot import it and use it here, because somehow TypeId.NUMERIC throws a NullPointerException
const NUMERIC_OID = 1700;

// connects to a PostgreSQL database
const pool = new Pool({
  user: '',
  host: PGHOST,
  database: PGDATABASE,
  password: '',
  port: Number(PGPORT),
});

// numeric values are returned from the database as strings, so setTypeParser converts them into numbers
types.setTypeParser(NUMERIC_OID, (value) => parseFloat(value));

const database = {
  query: (queryText: string, values?: any[]) => pool.query(queryText, values),
};

export default database;
