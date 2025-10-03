const { Client } = require('pg');

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  const isMutation = ['POST','PUT','DELETE'].includes(event.httpMethod);
  if (isMutation) {
    const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
    const expected = process.env.ADMIN_TOKEN;
    const provided = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : authHeader;
    if (!expected || !provided || provided !== expected) {
      return json(401, { error: 'Não autorizado' });
    }
  }

  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();

  try {
    await client.query(`CREATE TABLE IF NOT EXISTS aplicadores (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      cidade VARCHAR(255) NOT NULL,
      whatsapp VARCHAR(20) NOT NULL,
      status VARCHAR(50) DEFAULT 'pendente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    const url = new URL(event.rawUrl);
    const id = url.searchParams.get('id');

    switch (event.httpMethod) {
      case 'GET': {
        if (id) {
          const { rows } = await client.query('SELECT * FROM aplicadores WHERE id = $1', [id]);
          if (rows.length === 0) return json(404, { error: 'Aplicador não encontrado' });
          return json(200, rows[0]);
        }
        const { rows } = await client.query('SELECT * FROM aplicadores ORDER BY created_at DESC');
        return json(200, rows);
      }
      case 'POST': {
        const data = JSON.parse(event.body || '{}');
        const errors = [];
        if (!data.nome || data.nome.trim().length < 2) errors.push('Nome deve ter pelo menos 2 caracteres');
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Email deve ser válido');
        if (!data.cidade || data.cidade.trim().length < 2) errors.push('Cidade deve ter pelo menos 2 caracteres');
        if (!data.whatsapp || data.whatsapp.trim().length < 10) errors.push('WhatsApp deve ter pelo menos 10 dígitos');
        if (errors.length) return json(400, { error: 'Dados inválidos', details: errors });

        try {
          const existing = await client.query('SELECT id FROM aplicadores WHERE email = $1', [data.email]);
          if (existing.rows.length > 0) {
            return json(409, { error: 'Email já cadastrado', message: 'Já existe um aplicador com este email' });
          }
          const { rows } = await client.query(
            'INSERT INTO aplicadores (nome, email, cidade, whatsapp) VALUES ($1,$2,$3,$4) RETURNING *',
            [data.nome, data.email, data.cidade, data.whatsapp]
          );
          return json(201, { message: 'Aplicador cadastrado com sucesso', data: rows[0] });
        } catch (e) {
          if (e.code === '23505') {
            return json(409, { error: 'Email já cadastrado', message: 'Já existe um aplicador com este email' });
          }
          throw e;
        }
      }
      case 'PUT': {
        if (!id) return json(400, { error: 'ID é obrigatório' });
        const data = JSON.parse(event.body || '{}');
        const errors = [];
        if (!data.nome || data.nome.trim().length < 2) errors.push('Nome deve ter pelo menos 2 caracteres');
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Email deve ser válido');
        if (!data.cidade || data.cidade.trim().length < 2) errors.push('Cidade deve ter pelo menos 2 caracteres');
        if (!data.whatsapp || data.whatsapp.trim().length < 10) errors.push('WhatsApp deve ter pelo menos 10 dígitos');
        if (errors.length) return json(400, { error: 'Dados inválidos', details: errors });

        const { rows } = await client.query(
          'UPDATE aplicadores SET nome=$1, email=$2, cidade=$3, whatsapp=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *',
          [data.nome, data.email, data.cidade, data.whatsapp, id]
        );
        if (rows.length === 0) return json(404, { error: 'Aplicador não encontrado' });
        return json(200, { message: 'Aplicador atualizado com sucesso', data: rows[0] });
      }
      case 'DELETE': {
        if (!id) return json(400, { error: 'ID é obrigatório' });
        const { rows } = await client.query('DELETE FROM aplicadores WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) return json(404, { error: 'Aplicador não encontrado' });
        return json(200, { message: 'Aplicador removido com sucesso', data: rows[0] });
      }
      default:
        return json(405, { error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na função Netlify:', error);
    return json(500, { error: 'Erro interno do servidor' });
  } finally {
    await client.end();
  }
};


