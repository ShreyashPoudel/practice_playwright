import pkg from 'pg';
const { Client } = pkg;

// Configure your DB connection
const client = new Client({
  host: 'localhost',       // your DB host
  port: 5432,              // default PostgreSQL port
  user: 'your_user',       // DB username
  password: 'your_pass',   // DB password
  database: 'your_db',     // database name
});

export async function connectDB() {
  await client.connect();
}

export async function disconnectDB() {
  await client.end();
}

export async function queryDB(query, params = []) {
  const res = await client.query(query, params);
  return res.rows;
}