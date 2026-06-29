// Debug function — chama cada etapa do faturamento e retorna JSON bruto
// Uso: POST /api/debug-faturamento { "empresa":"DMS","codigo_pedido":12345,"etapa":"consultar" }
// etapa: "consultar" | "faturar" | "nf"

const CREDENCIAIS = {
  'MF Paris': { key:'952260381072',  secret:'8300b385eeec583c71439709ab866fc7' },
  'MFP':      { key:'952260381072',  secret:'8300b385eeec583c71439709ab866fc7' },
  'DMS':      { key:'1340821992510', secret:'dac287f9b3ec422dc93da6cdbcc3e0b2' },
  'Profi':    { key:'6625695374298', secret:'588e34aa9429edcae86f5e87c47a65df' },
  'PRF':      { key:'6625695374298', secret:'588e34aa9429edcae86f5e87c47a65df' },
};

async function omie(empresa, endpoint, call, param) {
  const cred = CREDENCIAIS[empresa] || CREDENCIAIS['MF Paris'];
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ call, app_key: cred.key, app_secret: cred.secret, param }),
  });
  return r.json();
}

exports.handler = async (event) => {
  const h = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: h, body: '' };

  const { empresa = 'DMS', codigo_pedido, etapa = 'consultar', codigo_nf } = JSON.parse(event.body || '{}');
  const cod = parseInt(codigo_pedido);

  try {
    if (etapa === 'consultar') {
      const r = await omie(empresa,
        'https://app.omie.com.br/api/v1/produtos/pedido/',
        'ConsultarPedido',
        [{ codigo_pedido: cod }]
      );
      return { statusCode: 200, headers: h, body: JSON.stringify({ etapa: 'ConsultarPedido', empresa, codigo_pedido: cod, response: r }, null, 2) };
    }

    if (etapa === 'faturar') {
      const r = await omie(empresa,
        'https://app.omie.com.br/api/v1/produtos/pedido/',
        'FaturarPedidoVenda',
        [{ codigo_pedido: cod, documento: { serie: '1' } }]
      );
      return { statusCode: 200, headers: h, body: JSON.stringify({ etapa: 'FaturarPedidoVenda', empresa, codigo_pedido: cod, response: r }, null, 2) };
    }

    if (etapa === 'nf') {
      const r = await omie(empresa,
        'https://app.omie.com.br/api/v1/produtos/nf/',
        'ConsultarNF',
        [{ codigo_nf_omie: parseInt(codigo_nf) }]
      );
      return { statusCode: 200, headers: h, body: JSON.stringify({ etapa: 'ConsultarNF', empresa, codigo_nf, response: r }, null, 2) };
    }

    return { statusCode: 400, headers: h, body: JSON.stringify({ error: 'etapa inválida: consultar | faturar | nf' }) };
  } catch (e) {
    return { statusCode: 500, headers: h, body: JSON.stringify({ error: e.message }) };
  }
};
