// Проксі до API Нової Пошти. Ключ (NP_API_KEY) лишається на сервері.
// GET /.netlify/functions/np?action=cities&q=льв
// GET /.netlify/functions/np?action=warehouses&cityRef=<ref>&q=

const NP_URL = 'https://api.novaposhta.ua/v2.0/json/';

async function callNP(apiKey, modelName, calledMethod, methodProperties) {
  const res = await fetch(NP_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({apiKey: apiKey, modelName: modelName, calledMethod: calledMethod, methodProperties: methodProperties}),
  });
  return res.json();
}

exports.handler = async function(event) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') return {statusCode: 204, headers: cors, body: ''};

  const apiKey = process.env.NP_API_KEY;
  if (!apiKey) {
    return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'np-not-configured', items: []})};
  }

  const p = event.queryStringParameters || {};
  const action = p.action;

  try {
    if (action === 'cities') {
      const q = (p.q || '').trim();
      if (q.length < 2) return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({items: []})};
      const data = await callNP(apiKey, 'Address', 'searchSettlements', {CityName: q, Limit: '20'});
      const addresses = (data && data.data && data.data[0] && data.data[0].Addresses) || [];
      const items = addresses
        .filter(function(a) { return Number(a.Warehouses) > 0 && a.DeliveryCity; })
        .map(function(a) { return {ref: a.DeliveryCity, present: a.Present, warehouses: Number(a.Warehouses)}; });
      return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({items: items})};
    }

    if (action === 'warehouses') {
      const cityRef = p.cityRef;
      if (!cityRef) return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({items: []})};
      const data = await callNP(apiKey, 'Address', 'getWarehouses', {CityRef: cityRef, Limit: '1000'});
      const list = (data && data.data) || [];
      const q = (p.q || '').trim().toLowerCase();
      const items = list
        .map(function(w) {
          return {
            ref: w.Ref,
            number: w.Number,
            description: w.Description,
            isPostomat: w.CategoryOfWarehouse === 'Postomat' || /поштомат/i.test(w.Description || ''),
          };
        })
        .filter(function(w) { return q ? (w.description || '').toLowerCase().indexOf(q) !== -1 || String(w.number).indexOf(q) !== -1 : true; });
      return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({items: items})};
    }

    return {statusCode: 400, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'unknown-action'})};
  } catch (err) {
    console.error('NP proxy error:', err && err.message);
    return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'np-request-failed', items: []})};
  }
};
