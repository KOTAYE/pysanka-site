/**
 * Integration tests — hit real staging endpoints
 *
 * Run: node --test tests/integration.test.mjs
 *
 * These tests hit develop staging Netlify function and Sanity API.
 * Orders created during tests are cleaned up automatically.
 */

import { describe, it, after } from 'node:test';
import assert from 'node:assert/strict';

const STAGING_URL = 'https://develop--nimble-churros-45fe19.netlify.app';
const SANITY_PROJECT = 'o009icrr';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;

const createdOrderIds = [];

async function sanityQuery(query) {
  const res = await fetch(`https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.result;
}

async function sanityDelete(ids) {
  if (!SANITY_TOKEN || !ids.length) return;
  const mutations = ids.map(id => ({ delete: { id } }));
  await fetch(`https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SANITY_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
}

// Cleanup test orders after all tests
after(async () => {
  if (createdOrderIds.length) {
    await sanityDelete(createdOrderIds);
    console.log(`Cleaned up ${createdOrderIds.length} test order(s) from Sanity`);
  }
});

describe('Sanity API', () => {
  it('should be reachable and return products', async () => {
    const products = await sanityQuery('*[_type=="product"]{name}[0..2]');
    assert.ok(Array.isArray(products), 'Should return array');
    assert.ok(products.length > 0, 'Should have at least one product');
  });

  it('should return collections', async () => {
    const collections = await sanityQuery('*[_type=="collection"]{title}[0..2]');
    assert.ok(collections.length > 0, 'Should have at least one collection');
  });

  it('should return blog posts', async () => {
    const posts = await sanityQuery('*[_type=="blogPost"]{title}[0..2]');
    assert.ok(posts.length > 0, 'Should have at least one blog post');
  });
});

describe('Order function - staging', () => {
  it('should reject GET requests', async () => {
    const res = await fetch(`${STAGING_URL}/.netlify/functions/order`);
    assert.equal(res.status, 405);
  });

  it('should reject empty body', async () => {
    const res = await fetch(`${STAGING_URL}/.netlify/functions/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.equal(res.status, 400);
  });

  it('should reject missing items', async () => {
    const res = await fetch(`${STAGING_URL}/.netlify/functions/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer: { name: 'Test', phone: '+380971234567' }, items: [] }),
    });
    assert.equal(res.status, 400);
  });

  it('should accept valid order and return order number', async () => {
    const res = await fetch(`${STAGING_URL}/.netlify/functions/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Test Order', phone: '+380975991959' },
        delivery: { city: 'Тест', np: '1' },
        items: [{ productName: 'Тестова писанка', quantity: 1, price: 100 }],
        paymentMethod: 'cod',
        comment: 'automated test — delete me',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.orderNumber, 'Should return orderNumber');
    assert.match(data.orderNumber, /^P\d{4}-\d{4}$/);

    // Find and track order for cleanup
    const orders = await sanityQuery(`*[_type=="order" && orderNumber=="${data.orderNumber}"]{_id}`);
    if (orders.length) createdOrderIds.push(orders[0]._id);
  });
});

describe('Static site - staging', () => {
  it('should serve index.html', async () => {
    const res = await fetch(`${STAGING_URL}/`);
    assert.equal(res.status, 200);
    const text = await res.text();
    assert.ok(text.includes('Писан'), 'Should contain site name');
  });

  it('should serve shop.html', async () => {
    const res = await fetch(`${STAGING_URL}/shop.html`);
    assert.equal(res.status, 200);
  });

  it('should serve script.js', async () => {
    const res = await fetch(`${STAGING_URL}/script.js`);
    assert.equal(res.status, 200);
    const text = await res.text();
    assert.ok(text.includes('PRODUCTS') || text.includes('loadFromSanity'), 'Should contain site logic');
  });
});
