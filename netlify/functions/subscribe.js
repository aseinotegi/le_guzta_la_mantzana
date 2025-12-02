const nodemailer = require('nodemailer');

// En Netlify, las variables de entorno ya están disponibles automáticamente
// Solo cargamos dotenv si estamos en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

async function sendWelcomeEmail(name, email) {
  // Validar que todas las variables de entorno necesarias estén configuradas
  const requiredEnvVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:', missingVars);
    throw new Error(`Credenciales SMTP no configuradas. Faltan: ${missingVars.join(', ')}`);
  }

  console.log('📧 Configuración SMTP detectada:');
  console.log('- Host:', process.env.SMTP_HOST);
  console.log('- Port:', process.env.SMTP_PORT);
  console.log('- User:', process.env.SMTP_USER ? '✓ Configurado' : '✗ No configurado');
  console.log('- Pass:', process.env.SMTP_PASS ? '✓ Configurado' : '✗ No configurado');
  console.log('- From:', process.env.SMTP_FROM_EMAIL);
  console.log('📧 Intentando enviar email a:', email);

  // Configurar transporter de Nodemailer (SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #ff4444;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.9);
            border: 3px solid #8b0000;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 0 50px rgba(139, 0, 0, 0.8);
          }
          h1 {
            color: #ff3333;
            text-align: center;
            font-size: 36px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 51, 51, 0.8);
          }
          p {
            line-height: 1.8;
            font-size: 16px;
            color: #ff6666;
            margin: 15px 0;
          }
          .highlight {
            color: #ff3333;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(255, 51, 51, 0.6);
          }
          .welcome-box {
            background: rgba(139, 0, 0, 0.2);
            border: 2px solid #8b0000;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #8b0000;
            font-size: 14px;
            color: #cc3333;
          }
          .countdown {
            font-size: 24px;
            color: #ff3333;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Bienvenido, ${name}!</h1>

          <div class="welcome-box">
            <p style="font-size: 20px; margin: 0;">
              🎉 ¡Tu suscripción está <span class="highlight">CONFIRMADA</span>! 🎉
            </p>
          </div>

          <p>Gracias por unirte a las noticias de <span class="highlight">Adios, Manuel :)</span></p>

          <p>A partir de ahora recibirás todas las actualizaciones importantes sobre lo que está por venir...</p>

          <div class="countdown">
            ⏰ La cuenta regresiva continúa ⏰<br>
            <span class="highlight">ABRIL 2026</span> se acerca
          </div>

          <p>Prepárate para:</p>
          <p>✓ Actualizaciones exclusivas<br>
             ✓ Noticias de último momento<br>
             ✓ Contenido especial para suscriptores</p>

          <div class="footer">
            <p style="font-style: italic; font-size: 16px;">A bixxxkor le gusta la mantzana</p>
            <p style="margin-top: 15px; font-size: 12px;">
              Si no solicitaste esta suscripción, puedes ignorar este correo.<br>
              Este es un mensaje automático, por favor no respondas a este email.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const fromAddress = `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`;
    console.log('📤 Enviando desde:', fromAddress);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "🎉 ¡Bienvenido! Tu suscripción está confirmada",
      html: emailHTML,
    });

    console.log("✅ Email enviado: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error enviando email (Nodemailer):", error);
    console.error("❌ Detalles del error:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });
    throw error;
  }
}

exports.handler = async (event, context) => {
  console.log('🚀 Función subscribe iniciada');
  console.log('🌍 Entorno:', process.env.NODE_ENV || 'no definido');

  // Headers comunes para todas las respuestas
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email } = JSON.parse(event.body);
    console.log('📥 Datos recibidos:', { name, email });

    if (!name || !email) {
      console.warn('⚠️ Datos incompletos');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Nombre y email son requeridos" }),
      };
    }

    // NOTE: Database logic removed for Netlify Serverless compatibility (Filesystem is ephemeral).
    // We are skipping the check if email exists and just sending the welcome email.
    // For persistence, connect a cloud database (Supabase, MongoDB, etc.) here.

    await sendWelcomeEmail(name, email);

    console.log('✅ Suscripción completada exitosamente');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "¡Suscripción exitosa! Revisa tu email de bienvenida.",
      }),
    };
  } catch (error) {
    console.error("❌ Error al procesar suscripción:", error);
    console.error("❌ Stack trace:", error.stack);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Error al procesar la suscripción",
        details: error.message,
      }),
    };
  }
};
