// One-time admin function — deletes specific routes from Firebase
// ABC1234: delete + return pedidos to carteira
// GFB7A41, OPO2695, ABC1AFE: delete only
const DATABASE_URL = 'https://mfparis-bd054-default-rtdb.firebaseio.com';
const DB_SECRET = 'XCLrY4sIS8xul6sIgYAro1UpfnuXPFCJvXsQ4Cum';

async function fbRead(path) {
  const r = await fetch(`${DATABASE_URL}/${path}.json?auth=${DB_SECRET}`);
  if (!r.ok) throw new Error(`Leitura ${path} falhou: ${r.status}`);
  return r.json();
}

async function fbWrite(path, data) {
  const r = await fetch(`${DATABASE_URL}/${path}.json?auth=${DB_SECRET}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(`Escrita ${path} falhou: ${r.status}`);
  return r.json();
}

async function fbDelete(path) {
  const r = await fetch(`${DATABASE_URL}/${path}.json?auth=${DB_SECRET}`, { method: 'DELETE' });
  if (!r.ok) throw new Error(`Delete ${path} falhou: ${r.status}`);
  return r.json();
}

exports.handler = async () => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  const log = [];

  try {
    // 1. ABC1234 — delete + devolver pedidos à carteira
    const dtABC = await fbRead('despachos/ABC1234');
    if (dtABC) {
      const paradas = dtABC.paradas || [];
      log.push(`ABC1234 "${dtABC.nomeRota}" — ${paradas.length} parada(s)`);

      if (paradas.length > 0) {
        const raw = await fbRead('carteira_envio/pedidos');
        const listaAtual = Array.isArray(raw) ? raw : (raw && typeof raw === 'object' ? Object.values(raw) : []);
        const numerosDevolver = new Set(paradas.map(p => String(p.numero_pedido || p.pedido || '')));
        const listaSemDup = listaAtual.filter(p => !numerosDevolver.has(String(p.numero_pedido || p.pedido || '')));
        const pedidosDevolver = paradas.map(p => ({
          numero_pedido: p.numero_pedido || p.pedido || '',
          codigo_pedido: p._codigo_pedido || p.codigo_pedido || '',
          cliente: p.cliente || p.nome_cliente || '',
          cnpj: p.cnpj || p._cnpj || '',
          cidade: p.cidade || p.municipio || '',
          uf: p.uf || p.estado || '',
          peso: p.peso || p.peso_total || 0,
          valor_total: p.valor_total || p.valor || 0,
          empresa: p._empresa || p.empresa || '',
          _empresa: p._empresa || p.empresa || '',
          segmento: p.segmento || p._segmento || '',
          itens: p.itens || [],
          ...(p._obs_atual ? { _obs_atual: p._obs_atual } : {}),
          devolvido_de_rota: 'ABC1234',
          devolvido_em: new Date().toISOString(),
        }));
        await fbWrite('carteira_envio/pedidos', [...listaSemDup, ...pedidosDevolver]);
        log.push(`  ✅ ${pedidosDevolver.length} pedido(s) devolvidos à carteira: ${pedidosDevolver.map(p => p.numero_pedido).join(', ')}`);
      }

      await fbDelete('despachos/ABC1234');
      log.push('  ✅ Rota ABC1234 deletada');
    } else {
      log.push('ABC1234 — não encontrada (já deletada)');
    }

    // 2. GFB7A41 — delete only
    const dtGFB = await fbRead('despachos/GFB7A41');
    if (dtGFB) {
      await fbDelete('despachos/GFB7A41');
      log.push(`GFB7A41 "${dtGFB.nomeRota}" — ✅ deletada`);
    } else {
      log.push('GFB7A41 — não encontrada (já deletada)');
    }

    // 3. OPO2695 — delete only
    const dtOPO = await fbRead('despachos/OPO2695');
    if (dtOPO) {
      await fbDelete('despachos/OPO2695');
      log.push(`OPO2695 "${dtOPO.nomeRota}" — ✅ deletada`);
    } else {
      log.push('OPO2695 — não encontrada (já deletada)');
    }

    // 4. ABC1AFE — delete only
    const dtABCF = await fbRead('despachos/ABC1AFE');
    if (dtABCF) {
      await fbDelete('despachos/ABC1AFE');
      log.push(`ABC1AFE "${dtABCF.nomeRota}" — ✅ deletada`);
    } else {
      log.push('ABC1AFE — não encontrada (já deletada)');
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, log }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: e.message, log }) };
  }
};
