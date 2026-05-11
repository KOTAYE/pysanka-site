const {createClient} = require('@sanity/client');
const {Resend} = require('resend');

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'o009icrr',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOrderNumber() {
  const now = new Date();
  const datePart = String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return 'P' + datePart + '-' + rand;
}

function buildMasterEmail(order) {
  const itemsHtml = order.items
    .map(function(i) { return '<tr><td style="padding:8px;border-bottom:1px solid #eee">' + i.productName + '</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">' + i.quantity + '</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">' + i.price + ' ₴</td></tr>'; })
    .join('');

  return '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
    '<div style="background:#181818;color:#fff;padding:24px;text-align:center">' +
    '<h1 style="margin:0;font-size:20px">Писан·ка — нове замовлення</h1></div>' +
    '<div style="padding:24px;background:#fff">' +
    '<p style="font-size:18px;color:#E97000;font-weight:bold">Замовлення №' + order.orderNumber + '</p>' +
    '<h3 style="margin-top:20px">Покупець</h3>' +
    '<p>' + order.customer.name + '<br>📞 ' + order.customer.phone +
    (order.customer.email ? '<br>✉️ ' + order.customer.email : '') + '</p>' +
    '<h3>Доставка</h3><p>' + order.delivery.city + ', Нова Пошта №' + order.delivery.np + '</p>' +
    '<h3>Товари</h3><table style="width:100%;border-collapse:collapse">' +
    '<tr style="background:#f7f7f7"><th style="padding:8px;text-align:left">Назва</th><th style="padding:8px">К-ть</th><th style="padding:8px;text-align:right">Ціна</th></tr>' +
    itemsHtml + '</table>' +
    '<p style="font-size:18px;text-align:right;margin-top:12px"><strong>Разом: ' + order.total + ' ₴</strong></p>' +
    '<p>Оплата: ' + (order.paymentMethod === 'cod' ? 'Накладений платіж' : 'Переказ на картку') + '</p>' +
    (order.comment ? '<p>Коментар: ' + order.comment + '</p>' : '') +
    '</div></div>';
}

function buildCustomerEmail(order) {
  const itemsHtml = order.items
    .map(function(i) { return '<tr><td style="padding:8px;border-bottom:1px solid #eee">' + i.productName + '</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">' + i.quantity + '</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">' + i.price + ' ₴</td></tr>'; })
    .join('');

  return '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
    '<div style="background:#181818;color:#fff;padding:24px;text-align:center">' +
    '<h1 style="margin:0;font-size:20px">Писан·ка</h1>' +
    '<p style="margin:4px 0 0;color:#E97000">Майстерня писанкового розпису</p></div>' +
    '<div style="padding:24px;background:#fff">' +
    '<p>Дякуємо за замовлення, ' + order.customer.name + '!</p>' +
    '<p style="font-size:18px;color:#E97000;font-weight:bold">Замовлення №' + order.orderNumber + '</p>' +
    '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
    '<tr style="background:#f7f7f7"><th style="padding:8px;text-align:left">Назва</th><th style="padding:8px">К-ть</th><th style="padding:8px;text-align:right">Ціна</th></tr>' +
    itemsHtml + '</table>' +
    '<p style="font-size:18px;text-align:right"><strong>Разом: ' + order.total + ' ₴</strong></p>' +
    '<p>Доставка: ' + order.delivery.city + ', Нова Пошта №' + order.delivery.np + '</p>' +
    '<p>Оплата: ' + (order.paymentMethod === 'cod' ? 'Накладений платіж при отриманні' : 'Переказ на картку (реквізити надішлемо окремо)') + '</p>' +
    '<div style="margin-top:24px;padding:16px;background:#f7f7f7;border-radius:8px">' +
    "<p style=\"margin:0\">Ми зв'яжемося з вами для підтвердження замовлення протягом доби.</p>" +
    '<p style="margin:8px 0 0">Телефон: +380 97 000 00 01</p></div></div>' +
    "<div style=\"padding:16px;text-align:center;color:#9e9e9e;font-size:12px\"><p>Писан·ка — майстерня Галини Сиротюк-П'ятничук, м. Коломия</p></div></div>";
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({error: 'Method not allowed'}) };
  }

  try {
    const body = JSON.parse(event.body);
    const {customer, delivery, items, paymentMethod, comment} = body;

    if (!customer || !customer.name || !customer.phone || !items || !items.length) {
      return { statusCode: 400, body: JSON.stringify({error: 'Missing required fields'}) };
    }

    const orderNumber = generateOrderNumber();
    const total = items.reduce(function(sum, i) { return sum + i.price * i.quantity; }, 0);

    const order = {
      orderNumber: orderNumber,
      customer: customer,
      delivery: delivery,
      items: items,
      total: total,
      paymentMethod: paymentMethod || 'cod',
      comment: comment || '',
    };

    // 1. Save to Sanity
    await sanity.create({
      _type: 'order',
      orderNumber: order.orderNumber,
      status: 'new',
      customer: order.customer,
      delivery: order.delivery,
      items: order.items,
      total: order.total,
      paymentMethod: order.paymentMethod,
      comment: order.comment,
      createdAt: new Date().toISOString(),
    });

    // 2. Email to master
    var masterEmail = process.env.MASTER_EMAIL || 'g.syrotiuk@example.com';
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Писанка <onboarding@resend.dev>',
      to: masterEmail,
      subject: 'Нове замовлення №' + orderNumber,
      html: buildMasterEmail(order),
    });

    // 3. Email to customer
    if (customer.email) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Писанка <onboarding@resend.dev>',
        to: customer.email,
        subject: 'Ваше замовлення №' + orderNumber + ' прийнято',
        html: buildCustomerEmail(order),
      });
    }

    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({orderNumber: orderNumber}),
    };
  } catch (err) {
    console.error('Order error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Failed to process order'}),
    };
  }
};
