// Proxy Omie com credenciais server-side (nunca expostas no frontend)
const CREDENCIAIS = {
  MFP:   { app_key: '952260381072',  app_secret: '8300b385eeec583c71439709ab866fc7' },
  DMS:   { app_key: '1340821992510', app_secret: 'dac287f9b3ec422dc93da6cdbcc3e0b2' },
  PROFI: { app_key: '6625695374298', app_secret: '588e34aa9429edcae86f5e87c47a65df' },
};

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
    const { endpoint, call, param, empresa } = body;

    if (!endpoint || !endpoint.startsWith('https://app.omie.com.br/')) {
      return new Response(JSON.stringify({ error: 'Endpoint invalido' }), { status: 400, headers });
    }

    const cred = CREDENCIAIS[empresa];
    if (!cred) {
      return new Response(JSON.stringify({ error: 'Empresa invalida: ' + empresa }), { status: 400, headers });
    }

    const payload = { call, app_key: cred.app_key, app_secret: cred.app_secret, param };
    const omieResp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await omieResp.json();
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500, headers });
  }
};

export const config = { path: '/api/omie-seguro' };
