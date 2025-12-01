# Configuración de Emails con SMTP2GO 📧

Esta guía explica cómo está configurado el sistema de emails y cómo usarlo.

## 🔧 Configuración actual

### Variables de entorno (.env)

```env
VITE_API_URL=http://localhost:3001
SMTP2GO_API_KEY=api-3E58E825F70146AEB02703B459C9E212
SMTP2GO_API_URL=https://api.smtp2go.com/v3/
SMTP_HOST=mail-eu.smtp2go.com
SMTP_PORT=2525
SMTP_FROM_EMAIL=noreply@astechreto.com
SMTP_FROM_NAME=Adios Manuel
```

### Servidor SMTP2GO

- **Host:** mail-eu.smtp2go.com
- **Puerto:** 2525 (alternativas: 8025, 587, 80, 25)
- **TLS:** Disponible en los mismos puertos
- **SSL:** Puertos 465, 8465, 443

## 🚀 Cómo usar

### 1. Iniciar el proyecto completo

```bash
npm run dev:all
```

Este comando inicia:
- Frontend (Vite) en http://localhost:5175
- Backend (Express) en http://localhost:3001

### 2. Iniciar por separado

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run server
```

## 📨 Flujo de suscripción

1. **Usuario completa formulario**
   - Nombre + Email

2. **Frontend envía petición**
   - POST a `http://localhost:3001/api/subscribe`
   - Body: `{ name, email }`

3. **Backend procesa**
   - Valida datos
   - Envía email vía SMTP2GO
   - Retorna confirmación

4. **Usuario recibe email**
   - Email HTML personalizado
   - Tema oscuro con diseño rojo
   - Confirmación de suscripción

## 📧 Template del Email

El email incluye:
- Saludo personalizado con el nombre
- Confirmación de suscripción
- Información sobre Abril 2026
- Estilo consistente con la web (tema oscuro/rojo)

## 🔒 Seguridad

- ✅ Variables de entorno en `.env` (no se suben a git)
- ✅ Validación de datos en frontend (Zod)
- ✅ Validación de datos en backend
- ✅ CORS configurado
- ✅ Error handling completo

## 🧪 Testing

### Probar el servidor

```bash
curl http://localhost:3001/api/health
```

Respuesta esperada:
```json
{"status":"OK","message":"Server is running"}
```

### Probar suscripción

```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## ⚠️ Troubleshooting

### Error: Cannot connect to SMTP server

**Solución:** Verifica que:
- La API key de SMTP2GO sea correcta
- El puerto no esté bloqueado por firewall
- Tengas conexión a internet

### Error: CORS

**Solución:** El servidor ya tiene CORS habilitado, pero si usas otro puerto:
```javascript
app.use(cors({
  origin: 'http://localhost:TU_PUERTO'
}))
```

### Email no llega

**Verifica:**
1. Carpeta de spam
2. Email del remitente configurado en SMTP2GO
3. Límites de la cuenta SMTP2GO
4. Logs del servidor backend

## 📊 Estructura del código

```
pagina-manu-modern/
├── .env                    # Variables de entorno (NO subir a git)
├── .env.example           # Template de variables
├── server/
│   └── index.js           # Backend Express con Nodemailer
├── src/
│   ├── components/
│   │   └── SubscriptionModal.jsx  # Frontend con fetch al backend
└── package.json           # Scripts: dev:all, server
```

## 🔄 Flujo de datos

```
Usuario → Formulario (React) → Frontend validation (Zod)
                    ↓
        POST /api/subscribe
                    ↓
        Backend (Express) → Nodemailer → SMTP2GO → Email
                    ↓
        Response JSON → Toast notification
```

## 🌐 Deploy en producción

1. **Variables de entorno:**
   - Actualizar `VITE_API_URL` con URL de producción
   - Mantener `SMTP2GO_API_KEY` segura

2. **Backend:**
   - Deployar en Heroku, Railway, Render, etc.
   - Configurar variables de entorno

3. **Frontend:**
   - Build: `npm run build`
   - Deploy en Vercel/Netlify
   - Actualizar VITE_API_URL

---

**¿Preguntas?** Revisa los logs del servidor o frontend para más detalles.
