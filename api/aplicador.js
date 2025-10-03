/**
 * API Vercel - Gerenciamento de Aplicadores
 * Substitui completamente as Netlify Functions
 * 
 * @fileoverview Endpoint para CRUD de aplicadores BlindaPhone
 * @version 1.0.0
 * @author NΞØ Protocol
 */

import { createClient } from '@vercel/postgres';

/**
 * Cliente do banco de dados Vercel Postgres
 * @type {import('@vercel/postgres').Client}
 */
let db;

/**
 * Inicializa conexão com banco de dados
 * @returns {Promise<import('@vercel/postgres').Client>}
 */
async function getDatabase() {
  if (!db) {
    db = createClient({
      connectionString: process.env.POSTGRES_URL,
    });
    await db.connect();
  }
  return db;
}

/**
 * Valida dados do aplicador
 * @param {Object} data - Dados do aplicador
 * @returns {Object} Resultado da validação
 */
function validateAplicador(data) {
  const errors = [];
  
  if (!data.nome || data.nome.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email deve ser válido');
  }
  
  if (!data.cidade || data.cidade.trim().length < 2) {
    errors.push('Cidade deve ter pelo menos 2 caracteres');
  }
  
  if (!data.whatsapp || data.whatsapp.trim().length < 10) {
    errors.push('WhatsApp deve ter pelo menos 10 dígitos');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Cria tabela de aplicadores se não existir
 * @param {import('@vercel/postgres').Client} client - Cliente do banco
 */
async function createTableIfNotExists(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS aplicadores (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      cidade VARCHAR(255) NOT NULL,
      whatsapp VARCHAR(20) NOT NULL,
      status VARCHAR(50) DEFAULT 'pendente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

/**
 * Handler principal da API
 * @param {import('http').IncomingMessage} req - Request object
 * @param {import('http').ServerResponse} res - Response object
 */
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Auth simples por token para operações mutáveis
  const isMutation = req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
  if (isMutation) {
    const authHeader = req.headers['authorization'] || '';
    const expected = process.env.ADMIN_TOKEN;
    const provided = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : authHeader;
    if (!expected || !provided || provided !== expected) {
      return res.status(401).json({ error: 'Não autorizado' });
    }
  }

  try {
    const client = await getDatabase();
    await createTableIfNotExists(client);

    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, client);
      case 'POST':
        return await handlePost(req, res, client);
      case 'PUT':
        return await handlePut(req, res, client);
      case 'DELETE':
        return await handleDelete(req, res, client);
      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    });
  }
}

/**
 * GET - Lista todos os aplicadores
 * @param {import('http').IncomingMessage} req - Request
 * @param {import('http').ServerResponse} res - Response
 * @param {import('@vercel/postgres').Client} client - Cliente DB
 */
async function handleGet(req, res, client) {
  const { id } = req.query;
  
  if (id) {
    // Buscar aplicador específico
    const result = await client.sql`
      SELECT * FROM aplicadores WHERE id = ${id}
    `;
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aplicador não encontrado' });
    }
    
    return res.status(200).json(result.rows[0]);
  } else {
    // Listar todos os aplicadores
    const result = await client.sql`
      SELECT * FROM aplicadores 
      ORDER BY created_at DESC
    `;
    
    return res.status(200).json(result.rows);
  }
}

/**
 * POST - Criar novo aplicador
 * @param {import('http').IncomingMessage} req - Request
 * @param {import('http').ServerResponse} res - Response
 * @param {import('@vercel/postgres').Client} client - Cliente DB
 */
async function handlePost(req, res, client) {
  const data = req.body;
  
  // Validar dados
  const validation = validateAplicador(data);
  if (!validation.isValid) {
    return res.status(400).json({ 
      error: 'Dados inválidos',
      details: validation.errors
    });
  }
  
  try {
    // Verificar se email já existe
    const existing = await client.sql`
      SELECT id FROM aplicadores WHERE email = ${data.email}
    `;
    
    if (existing.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Email já cadastrado',
        message: 'Já existe um aplicador com este email'
      });
    }
    
    // Inserir novo aplicador
    const result = await client.sql`
      INSERT INTO aplicadores (nome, email, cidade, whatsapp)
      VALUES (${data.nome}, ${data.email}, ${data.cidade}, ${data.whatsapp})
      RETURNING *
    `;
    
    return res.status(201).json({
      message: 'Aplicador cadastrado com sucesso',
      data: result.rows[0]
    });
    
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ 
        error: 'Email já cadastrado',
        message: 'Já existe um aplicador com este email'
      });
    }
    throw error;
  }
}

/**
 * PUT - Atualizar aplicador
 * @param {import('http').IncomingMessage} req - Request
 * @param {import('http').ServerResponse} res - Response
 * @param {import('@vercel/postgres').Client} client - Cliente DB
 */
async function handlePut(req, res, client) {
  const { id } = req.query;
  const data = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'ID é obrigatório' });
  }
  
  // Validar dados
  const validation = validateAplicador(data);
  if (!validation.isValid) {
    return res.status(400).json({ 
      error: 'Dados inválidos',
      details: validation.errors
    });
  }
  
  try {
    const result = await client.sql`
      UPDATE aplicadores 
      SET nome = ${data.nome}, 
          email = ${data.email}, 
          cidade = ${data.cidade}, 
          whatsapp = ${data.whatsapp},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aplicador não encontrado' });
    }
    
    return res.status(200).json({
      message: 'Aplicador atualizado com sucesso',
      data: result.rows[0]
    });
    
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ 
        error: 'Email já cadastrado',
        message: 'Já existe outro aplicador com este email'
      });
    }
    throw error;
  }
}

/**
 * DELETE - Remover aplicador
 * @param {import('http').IncomingMessage} req - Request
 * @param {import('http').ServerResponse} res - Response
 * @param {import('@vercel/postgres').Client} client - Cliente DB
 */
async function handleDelete(req, res, client) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID é obrigatório' });
  }
  
  const result = await client.sql`
    DELETE FROM aplicadores WHERE id = ${id} RETURNING *
  `;
  
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Aplicador não encontrado' });
  }
  
  return res.status(200).json({
    message: 'Aplicador removido com sucesso',
    data: result.rows[0]
  });
}
