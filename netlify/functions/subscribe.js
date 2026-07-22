const {Resend} = require('resend');
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

exports.handler = async function(event) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') return {statusCode: 204, headers: cors, body: ''};
  if (event.httpMethod !== 'POST') return {statusCode: 405, headers: cors, body: JSON.stringify({error: 'Method not allowed'})};

  try {
    const {email} = JSON.parse(event.body || '{}');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {statusCode: 400, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'Некоректний email'})};
    }
    if (!resend) {
      return {statusCode: 500, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({error: 'Сервіс недоступний'})};
    }

    const from = process.env.EMAIL_FROM || 'Писанка <onboarding@resend.dev>';
    const master = process.env.MASTER_EMAIL || 'syrotiukva@gmail.com';

    // Сповіщення майстрині про нового підписника
    await resend.emails.send({
      from: from,
      to: master,
      subject: 'Нова підписка на новини',
      html: '<p style="font-family:Arial,sans-serif">Нова підписка на новини майстерні:</p>' +
            '<p style="font-family:Arial,sans-serif;font-size:18px;font-weight:bold">' + email + '</p>',
    });

    // Підтвердження підписнику (best-effort)
    try {
      await resend.emails.send({
        from: from,
        to: email,
        subject: 'Дякуємо за підписку — Писан·ка',
        html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
          '<div style="background:#181818;color:#fff;padding:24px;text-align:center">' +
          '<h1 style="margin:0;font-size:20px">Писан·ка</h1>' +
          '<p style="margin:4px 0 0;color:#E97000">Майстерня писанкового розпису</p></div>' +
          '<div style="padding:24px;background:#fff">' +
          '<p>Дякуємо, що підписалися на новини майстерні!</p>' +
          '<p>Ви першими дізнаватиметеся про нові колекції, відкриття бронювань на Великдень і традиції писанкарства.</p>' +
          '<p style="margin-top:20px"><a href="https://pysanky-syrotiuk.com/shop.html" style="color:#E97000">Переглянути писанки →</a></p>' +
          '</div>' +
          '<div style="padding:16px;text-align:center;color:#9e9e9e;font-size:12px"><p>Писан·ка — м. Коломия</p></div></div>',
      });
    } catch (e) { console.warn('Subscriber confirmation failed:', e && e.message); }

    return {statusCode: 200, headers: {...cors, 'Content-Type': 'application/json'}, body: JSON.stringify({ok: true})};
  } catch (err) {
    console.error('Subscribe error:', err && err.message);
    return {statusCode: 500, headers: cors, body: JSON.stringify({error: 'Не вдалося підписатися'})};
  }
};
