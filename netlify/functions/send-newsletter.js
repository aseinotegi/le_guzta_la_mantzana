const nodemailer = require('nodemailer');
const { getStore } = require('@netlify/blobs');

// En Netlify, las variables de entorno ya están disponibles automáticamente
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.handler = async (event, context) => {
  console.log('📧 Función send-newsletter iniciada');

  // Headers comunes
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Manejar preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Verificar autenticación con ADMIN_KEY
    const adminKey = event.headers.authorization || event.queryStringParameters?.key;

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      console.warn('⚠️ Intento de acceso no autorizado');
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: "No autorizado. Se requiere ADMIN_KEY válido"
        }),
      };
    }

    console.log('✅ Autenticación exitosa');

    // Parsear el body
    const { subject, htmlContent, textContent } = JSON.parse(event.body);

    if (!subject || (!htmlContent && !textContent)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Se requiere 'subject' y al menos 'htmlContent' o 'textContent'"
        }),
      };
    }

    // Obtener lista de suscriptores
    const store = getStore('subscribers');
    const subscribers = await store.get('list', { type: 'json' }) || [];

    if (subscribers.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "No hay suscriptores en la lista",
          sent: 0,
          failed: 0,
        }),
      };
    }

    console.log(`📊 Enviando newsletter a ${subscribers.length} suscriptores`);

    // Configurar transporter SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar emails
    const results = {
      sent: 0,
      failed: 0,
      errors: [],
    };

    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
          to: subscriber.email,
          subject: subject,
          text: textContent,
          html: htmlContent,
        });

        results.sent++;
        console.log(`✅ Email enviado a: ${subscriber.email}`);
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: subscriber.email,
          error: error.message,
        });
        console.error(`❌ Error enviando a ${subscriber.email}:`, error.message);
      }
    }

    console.log(`📊 Resultados: ${results.sent} enviados, ${results.failed} fallidos`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Newsletter enviada a ${results.sent} de ${subscribers.length} suscriptores`,
        sent: results.sent,
        failed: results.failed,
        errors: results.errors,
      }),
    };

  } catch (error) {
    console.error('❌ Error al enviar newsletter:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Error al enviar newsletter",
        details: error.message,
      }),
    };
  }
};
