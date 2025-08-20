// db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase pooler butuh SSL selalu
  ssl: { rejectUnauthorized: false }       // <-- aktifkan selalu
});

module.exports = pool;
