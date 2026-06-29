const DATABASE_URL = 'https://mfparis-bd054-default-rtdb.firebaseio.com';
const DB_SECRET = 'XCLrY4sIS8xul6sIgYAro1UpfnuXPFCJvXsQ4Cum';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { path } = body;
    if (!path) return { statusCode: 400, headers, body: JSON.stringify({ error: 'path obrigatorio' }) };

    const url = `${DATABASE_URL}/${path}.json?auth=${DB_SECRET}`;
    const firebaseResp = await fetch(url);
    if (!firebaseResp.ok) {
      const txt = await firebaseResp.text();
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Firebase erro: ' + txt }) };
    }
    const result = await firebaseResp.json();
    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
