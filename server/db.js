const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'messenger_user',
  password: 'messenger_password',
});

module.exports = pool;