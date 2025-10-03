// Netlify/Express adapter replacing Firebase Functions
const express = require("express");
const cors = require("cors");
const { pool, ensureSchema } = require('./db');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// Ensure schema on cold start
ensureSchema().catch((e) => console.error('Schema init error:', e));

// POST - Cadastrar aplicador
app.post("/aplicador", async (req, res) => {
  try {
    const { nome, email, cidade, telefone } = req.body || {};
    const { rows } = await pool.query(
      `INSERT INTO aplicadores (nome, email, cidade, telefone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, email, cidade, telefone, created_at`,
      [nome || null, email || null, cidade || null, telefone || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Buscar por cidade
app.get("/cidade/:nome", async (req, res) => {
  try {
    const cidade = req.params.nome;
    const { rows } = await pool.query(
      `SELECT id, nome, email, cidade, telefone, created_at, updated_at
       FROM aplicadores WHERE cidade = $1 ORDER BY created_at DESC`,
      [cidade]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar por cidade:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Listar todos os aplicadores
app.get("/aplicadores", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nome, email, cidade, telefone, created_at, updated_at
       FROM aplicadores ORDER BY created_at DESC`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar aplicadores:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Buscar aplicador por ID
app.get("/aplicador/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT id, nome, email, cidade, telefone, created_at, updated_at
       FROM aplicadores WHERE id = $1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Aplicador não encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// PUT - Atualizar aplicador
app.put("/aplicador/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cidade, telefone } = req.body || {};
    const { rowCount, rows } = await pool.query(
      `UPDATE aplicadores SET
         nome = COALESCE($2, nome),
         email = COALESCE($3, email),
         cidade = COALESCE($4, cidade),
         telefone = COALESCE($5, telefone),
         updated_at = NOW()
       WHERE id = $1
       RETURNING id, nome, email, cidade, telefone, created_at, updated_at`,
      [id, nome || null, email || null, cidade || null, telefone || null]
    );
    if (!rowCount) return res.status(404).json({ error: 'Aplicador não encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// DELETE - Deletar aplicador
app.delete("/aplicador/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      `DELETE FROM aplicadores WHERE id = $1`,
      [id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Aplicador não encontrado' });
    res.status(200).json({ msg: "Aplicador deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// Netlify handler adapter
const serverless = require("serverless-http");
module.exports = serverless(app);
