// Proxy Omie com credenciais server-side
const CREDENCIAIS = {
  MFP:   { app_key: '952260381072',  app_secret: '8300b385eeec583c71439709ab866fc7' },
  DMS:   { app_key: '1340821992510', app_secret: 'dac287f9b3ec422dc93da6cdbcc3e0b2' },
  PROFI: { app_key: '6625695374298', app_secret: '588e34aa9429edcae86f5e87c47a65df' },
};

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
    const { endpoint, call, param, empresa } = body;

    if (!endpoint || !endpoint.startsWith('https://app.omie.com.br/')) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Endpoint invalido' }) };
    }

    const cred = CREDENCIAIS[empresa];
    if (!cred) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Empresa invalida: ' + empresa }) };
    }

    const payload = { call, app_key: cred.app_key, app_secret: cred.app_secret, param };
    const omieResp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await omieResp.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};
