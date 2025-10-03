const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  // Log once in dev to help setup
  console.warn('DATABASE_URL not set. API routes will fail until configured.');
}

const pool = new Pool({ connectionString, max: 5, idleTimeoutMillis: 10000 });

async function ensureSchema() {
  const sql = `
  CREATE TABLE IF NOT EXISTS aplicadores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    email TEXT,
    cidade TEXT,
    telefone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
  );`;
  await pool.query(sql);
}

module.exports = { pool, ensureSchema };

