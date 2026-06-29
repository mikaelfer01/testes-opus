const DATABASE_URL = 'https://mfparis-bd054-default-rtdb.firebaseio.com';
const DB_SECRET = 'XCLrY4sIS8xul6sIgYAro1UpfnuXPFCJvXsQ4Cum';

export default async (request) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers });
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    const body = await request.json();
    const { path, data, method } = body;
    if (!path) return new Response(JSON.stringify({ error: 'path obrigatorio' }), { status: 400, headers });

    const url = `${DATABASE_URL}/${path}.json?auth=${DB_SECRET}`;
    let fetchMethod = 'PUT';
    if (method === 'update') fetchMethod = 'PATCH';
    if (method === 'remove') fetchMethod = 'DELETE';

    const fetchOptions = { method: fetchMethod, headers: { 'Content-Type': 'application/json' } };
    if (fetchMethod !== 'DELETE') fetchOptions.body = JSON.stringify(data);

    const firebaseResp = await fetch(url, fetchOptions);
    if (!firebaseResp.ok) {
      const txt = await firebaseResp.text();
      return new Response(JSON.stringify({ error: 'Firebase erro: ' + txt }), { status: 500, headers });
    }
    const result = await firebaseResp.json();
    return new Response(JSON.stringify({ ok: true, result }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
};

export const config = { path: '/api/firebase-write' };
