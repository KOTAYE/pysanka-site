const {Resend} = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function trackingUrl(carrier, ttn) {
  const t = encodeURIComponent(ttn);
  if (/укрпошт|ukrposhta/i.test(carrier || '')) return 'https://track.ukrposhta.ua/tracking_UA.html?barcode=' + t;
  if (/meest/i.test(carrier || '')) return 'https://mypost.meest.com/tracking/' + t;
  return 'https://novaposhta.ua/tracking/?cargo_number=' + t; // Нова Пошта (за замовчуванням)
}

function buildShippedEmail(o) {
  const track = trackingUrl(o.carrier, o.ttn);
  return '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
    '<div style="background:#181818;color:#fff;padding:24px;text-align:center">' +
    '<h1 style="margin:0;font-size:20px">Писан·ка</h1>' +
    '<p style="margin:4px 0 0;color:#E97000">Майстерня писанкового розпису</p></div>' +
    '<div style="padding:24px;background:#fff">' +
    '<p>' + (o.name ? 'Вітаємо, ' + o.name + '!' : 'Вітаємо!') + '</p>' +
    '<p>Ваше замовлення <strong>№' + o.orderNumber + '</strong> передане в доставку — <strong>' + (o.carrier || 'Нова Пошта') + '</strong>.</p>' +
    '<div style="margin:22px 0;padding:20px;background:#f7f7f7;border-radius:8px;text-align:center">' +
    '<p style="margin:0;color:#9e9e9e;font-size:13px">Номер для відстеження (ТТН)</p>' +
    '<p style="margin:6px 0;font-size:24px;font-weight:bold;letter-spacing:1px;color:#181818">' + o.ttn + '</p>' +
    '<a href="' + track + '" style="display:inline-block;margin-top:10px;background:#E97000;color:#fff;text-decoration:none;padding:11px 24px;border-radius:6px;font-weight:bold">Відстежити посилку →</a>' +
    '</div>' +
    '<p>Дякуємо за покупку! Якщо виникнуть питання — телефонуйте: +380 97 599 19 59.</p>' +
    '</div>' +
    '<div style="padding:16px;text-align:center;color:#9e9e9e;font-size:12px"><p>Писан·ка — майстерня Галини Сиротюк-Пʼятничук, м. Коломия</p></div></div>';
}

exports.handler = async function(event) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') return {statusCode: 204, headers: cors, body: ''};
  if (event.httpMethod !== 'POST') return {statusCode: 405, headers: cors, body: JSON.stringify({error: 'Method not allowed'})};

  try {
    const body = JSON.parse(event.body);
    const {secret, email, orderNumber, name, ttn, carrier} = body;

    // Захист: без правильного пароля нічого не шлемо
    if (!process.env.SHIP_SECRET || secret !== process.env.SHIP_SECRET) {
      return {statusCode: 401, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'Невірний пароль'})};
    }
    if (!email || !ttn || !orderNumber) {
      return {statusCode: 400, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'Заповніть email, номер замовлення та ТТН'})};
    }
    if (!resend) {
      return {statusCode: 500, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'Email-сервіс не налаштований'})};
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Писанка <onboarding@resend.dev>',
      to: email,
      subject: 'Замовлення №' + orderNumber + ' відправлено — ТТН ' + ttn,
      html: buildShippedEmail({orderNumber: orderNumber, name: name, ttn: ttn, carrier: carrier}),
    });

    return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({ok: true})};
  } catch (err) {
    console.error('Ship error:', err && err.message);
    return {statusCode: 500, headers: cors, body: JSON.stringify({error: 'Не вдалося надіслати лист'})};
  }
};
