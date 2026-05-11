/**
 * Tests for product detail page data mapping
 *
 * Run: node --test tests/product-page.test.mjs
 *
 * Verifies that Sanity product data maps correctly to the product page fields.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const SANITY_PROJECT = 'o009icrr';

async function fetchProducts() {
  const res = await fetch(
    `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent('*[_type == "product"] | order(_createdAt asc){ name, school, price, description, eggType, technique, symbolism, duration, colorPalette, inStock, mainImage, tag, slug, longDescription }')}`
  );
  const data = await res.json();
  return data.result;
}

const EGG_LABELS = {
  curyche: 'Куряче, ~5,5 × 4 см',
  gusyache: 'Гусяче, ~9 × 6 см',
  strausyne: 'Страусове, ~15 × 12 см',
  perepelyne: 'Перепелине, ~3 × 2 см',
};

describe('Product data from Sanity', () => {
  let products;

  it('should fetch all products', async () => {
    products = await fetchProducts();
    assert.ok(products.length >= 16, `Expected at least 16 products, got ${products.length}`);
  });

  it('every product should have name', async () => {
    if (!products) products = await fetchProducts();
    for (const p of products) {
      assert.ok(p.name, `Product missing name: ${JSON.stringify(p)}`);
    }
  });

  it('every product should have school', async () => {
    if (!products) products = await fetchProducts();
    for (const p of products) {
      assert.ok(p.school, `"${p.name}" missing school`);
    }
  });

  it('every product should have price > 0', async () => {
    if (!products) products = await fetchProducts();
    for (const p of products) {
      assert.ok(p.price > 0, `"${p.name}" has invalid price: ${p.price}`);
    }
  });

  it('every product should have valid eggType', async () => {
    if (!products) products = await fetchProducts();
    const validTypes = Object.keys(EGG_LABELS);
    for (const p of products) {
      assert.ok(p.eggType, `"${p.name}" missing eggType`);
      assert.ok(validTypes.includes(p.eggType), `"${p.name}" has unknown eggType: "${p.eggType}"`);
    }
  });

  it('eggType should map to human-readable label', async () => {
    if (!products) products = await fetchProducts();
    for (const p of products) {
      if (p.eggType) {
        const label = EGG_LABELS[p.eggType];
        assert.ok(label, `No label for eggType "${p.eggType}" on "${p.name}"`);
      }
    }
  });
});

describe('Product detail page fields', () => {
  let products;

  it('should check which products are missing key detail fields', async () => {
    products = await fetchProducts();
    const fields = ['technique', 'symbolism', 'description'];
    const missing = [];

    for (const p of products) {
      const missingFields = fields.filter(f => !p[f]);
      if (missingFields.length > 0) {
        missing.push({ name: p.name, missing: missingFields });
      }
    }

    if (missing.length > 0) {
      console.log('\n⚠️  Products with missing detail fields:');
      for (const m of missing) {
        console.log(`   "${m.name}" — missing: ${m.missing.join(', ')}`);
      }
    }

    // At least original 16 products should have technique
    const withTechnique = products.filter(p => p.technique);
    assert.ok(withTechnique.length >= 14, `Expected at least 14 products with technique, got ${withTechnique.length}`);
  });

  it('detail merge should work for product with all fields', () => {
    // Simulate what pages.js does
    const product = {
      eggType: 'curyche',
      symbolism: 'Test symbolism',
      technique: 'Воскова',
      duration: '6 годин',
      colorPalette: 'Червоний, чорний',
      longDesc: 'Long description',
      inStock: true,
    };
    const detail = {};

    // Merge logic from pages.js
    if (!detail.eggSize && product.eggType) detail.eggSize = EGG_LABELS[product.eggType] || product.eggType;
    if (!detail.symbolism && product.symbolism) detail.symbolism = product.symbolism;
    if (!detail.technique && product.technique) detail.technique = product.technique;
    if (!detail.duration && product.duration) detail.duration = product.duration;
    if (!detail.colorPalette && product.colorPalette) detail.colorPalette = product.colorPalette;
    if (!detail.longDesc && product.longDesc) detail.longDesc = product.longDesc;
    if (!detail.inStock) { detail.inStock = product.inStock !== false; detail.stockText = detail.inStock ? 'У наявності' : 'Під замовлення'; }

    assert.equal(detail.eggSize, 'Куряче, ~5,5 × 4 см');
    assert.equal(detail.symbolism, 'Test symbolism');
    assert.equal(detail.technique, 'Воскова');
    assert.equal(detail.duration, '6 годин');
    assert.equal(detail.colorPalette, 'Червоний, чорний');
    assert.equal(detail.longDesc, 'Long description');
    assert.equal(detail.inStock, true);
    assert.equal(detail.stockText, 'У наявності');
  });

  it('detail merge should work for product with partial fields (no symbolism)', () => {
    const product = {
      eggType: 'gusyache',
      symbolism: null,
      technique: 'Травлення',
      duration: '8 годин',
      colorPalette: null,
      longDesc: '',
      inStock: true,
    };
    const detail = {};

    if (!detail.eggSize && product.eggType) detail.eggSize = EGG_LABELS[product.eggType] || product.eggType;
    if (!detail.symbolism && product.symbolism) detail.symbolism = product.symbolism;
    if (!detail.technique && product.technique) detail.technique = product.technique;
    if (!detail.duration && product.duration) detail.duration = product.duration;
    if (!detail.colorPalette && product.colorPalette) detail.colorPalette = product.colorPalette;
    if (!detail.longDesc && product.longDesc) detail.longDesc = product.longDesc;
    if (!detail.inStock) { detail.inStock = product.inStock !== false; detail.stockText = detail.inStock ? 'У наявності' : 'Під замовлення'; }

    assert.equal(detail.eggSize, 'Гусяче, ~9 × 6 см');
    assert.equal(detail.technique, 'Травлення', 'Technique should be set even without symbolism');
    assert.equal(detail.duration, '8 годин', 'Duration should be set even without symbolism');
    assert.ok(!detail.symbolism, 'Symbolism should remain empty');
    assert.ok(!detail.colorPalette, 'ColorPalette should remain empty when null');
  });

  it('PRODUCT_DETAILS should take priority over Sanity data', () => {
    const product = {
      eggType: 'curyche',
      technique: 'Sanity technique',
    };
    const detail = {
      eggSize: 'Custom size from PRODUCT_DETAILS',
      technique: 'Original technique from PRODUCT_DETAILS',
    };

    if (!detail.eggSize && product.eggType) detail.eggSize = EGG_LABELS[product.eggType] || product.eggType;
    if (!detail.technique && product.technique) detail.technique = product.technique;

    assert.equal(detail.eggSize, 'Custom size from PRODUCT_DETAILS', 'Should keep PRODUCT_DETAILS value');
    assert.equal(detail.technique, 'Original technique from PRODUCT_DETAILS', 'Should keep PRODUCT_DETAILS value');
  });
});
