const { getStore } = require('@netlify/blobs');

// En Netlify, las variables de entorno ya están disponibles automáticamente
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.handler = async (event, context) => {
  console.log('🔍 Función get-subscribers iniciada');

  // Headers comunes para todas las respuestas
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Manejar preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Solo permitir GET
  if (event.httpMethod !== "GET") {
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
          error: "No autorizado. Se requiere ADMIN_KEY válido en header 'Authorization' o query param '?key='"
        }),
      };
    }

    console.log('✅ Autenticación exitosa');

    // Obtener lista de suscriptores
    const store = getStore({
      name: 'subscribers',
      context,
    });
    const subscribers = await store.get('list', { type: 'json' }) || [];

    console.log(`📊 Retornando ${subscribers.length} suscriptores`);

    // Opción para obtener solo emails (útil para copiar/pegar)
    const format = event.queryStringParameters?.format;

    if (format === 'emails') {
      // Retornar solo la lista de emails separados por coma
      const emailList = subscribers.map(sub => sub.email).join(', ');
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'text/plain' },
        body: emailList,
      };
    } else if (format === 'csv') {
      // Retornar en formato CSV
      const csv = [
        'Nombre,Email,Fecha de Suscripción',
        ...subscribers.map(sub =>
          `"${sub.name}","${sub.email}","${sub.subscribedAt}"`
        )
      ].join('\n');

      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'text/csv' },
        body: csv,
      };
    }

    // Por defecto, retornar JSON completo
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: subscribers.length,
        subscribers: subscribers,
      }),
    };

  } catch (error) {
    console.error('❌ Error obteniendo suscriptores:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Error al obtener la lista de suscriptores",
        details: error.message,
      }),
    };
  }
};
