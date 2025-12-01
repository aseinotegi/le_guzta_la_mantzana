# Base de Datos de Suscriptores 📊

Sistema de base de datos SQLite para gestionar suscriptores.

## 🗄️ Estructura de la Base de Datos

### Tabla: `subscribers`

```sql
CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active INTEGER DEFAULT 1
)
```

### Campos:

- **id**: ID único autoincremental
- **name**: Nombre del suscriptor
- **email**: Email único del suscriptor
- **subscribed_at**: Fecha y hora de suscripción (automático)
- **is_active**: Estado (1 = activo, 0 = inactivo)

---

## 📧 Flujo de Suscripción

### 1. Usuario se suscribe
```
Frontend → POST /api/subscribe → Backend
```

### 2. Backend verifica
```javascript
if (subscriberDB.exists(email)) {
  return error: "Email ya registrado"
}
```

### 3. Si es nuevo suscriptor:
- ✅ Guarda en base de datos
- ✅ Envía email de bienvenida vía SMTP2GO API
- ✅ Retorna confirmación

### 4. Si ya existe:
- ❌ Retorna error: "Este email ya está suscrito"
- No envía email duplicado

---

## 🔍 Funciones Disponibles

### `subscriberDB.exists(email)`
Verifica si un email ya está registrado.
```javascript
const exists = subscriberDB.exists('test@example.com')
// Returns: true | false
```

### `subscriberDB.add(name, email)`
Agrega un nuevo suscriptor.
```javascript
const result = subscriberDB.add('Juan', 'juan@example.com')
// Returns: { success: true, id: 1 }
// Or: { success: false, error: 'Email ya registrado' }
```

### `subscriberDB.getByEmail(email)`
Obtiene información de un suscriptor por email.
```javascript
const subscriber = subscriberDB.getByEmail('juan@example.com')
// Returns: { id, name, email, subscribed_at, is_active }
```

### `subscriberDB.getAll()`
Obtiene todos los suscriptores activos.
```javascript
const all = subscriberDB.getAll()
// Returns: Array de suscriptores
```

### `subscriberDB.count()`
Cuenta los suscriptores activos.
```javascript
const total = subscriberDB.count()
// Returns: número
```

---

## 📨 Email de Bienvenida

### Características del email:
- ✅ **HTML personalizado** con nombre del suscriptor
- ✅ **Tema oscuro/rojo** consistente con la web
- ✅ **Envío vía SMTP2GO API REST** (no SMTP)
- ✅ **Solo se envía a nuevos suscriptores**

### Template incluye:
```
🎉 ¡Bienvenido, [Nombre]!
✅ Confirmación de suscripción
⏰ Cuenta regresiva a Abril 2026
📋 Lista de beneficios
🔒 Nota de privacidad
```

---

## 🌐 Endpoints API

### POST `/api/subscribe`
Suscribe un nuevo usuario.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "¡Suscripción exitosa! Revisa tu email de bienvenida."
}
```

**Response (ya existe):**
```json
{
  "error": "Este email ya está suscrito",
  "message": "Ya estás recibiendo nuestras noticias"
}
```

### GET `/api/stats`
Obtiene estadísticas de suscriptores.

**Response:**
```json
{
  "total_subscribers": 15,
  "message": "15 suscriptores activos"
}
```

### GET `/api/health`
Health check del servidor.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 📁 Ubicación de Archivos

```
server/
├── index.js              # Servidor principal
├── database.js           # Gestión de BD SQLite
└── subscribers.db        # Base de datos (NO subir a git)
```

---

## 🔒 Seguridad

### Base de datos:
- ✅ Archivo `.db` en `.gitignore`
- ✅ Emails únicos (constraint UNIQUE)
- ✅ Validación de datos en backend

### API:
- ✅ CORS habilitado
- ✅ Validación de campos requeridos
- ✅ Error handling completo
- ✅ API key en variables de entorno

---

## 🧪 Testing Manual

### 1. Probar suscripción nueva
```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### 2. Probar suscripción duplicada
```bash
# Ejecutar el mismo comando dos veces
# La segunda vez debería dar error
```

### 3. Ver estadísticas
```bash
curl http://localhost:3001/api/stats
```

### 4. Verificar base de datos
```bash
cd pagina-manu-modern/server
sqlite3 subscribers.db "SELECT * FROM subscribers;"
```

---

## 🐛 Troubleshooting

### Error: "Este email ya está suscrito"
**Causa:** El email ya existe en la base de datos.
**Solución:** Usar otro email o eliminar el registro existente.

### Error: "Error al enviar email"
**Causa:** Problema con SMTP2GO API.
**Verificar:**
- API Key correcta en `.env`
- Email del remitente verificado en SMTP2GO
- Conexión a internet

### Base de datos corrupta
**Solución:**
```bash
cd server
rm subscribers.db
# El servidor recreará la tabla automáticamente
```

---

## 📊 Consultas SQL Útiles

### Ver todos los suscriptores
```sql
SELECT * FROM subscribers ORDER BY subscribed_at DESC;
```

### Contar suscriptores por día
```sql
SELECT DATE(subscribed_at) as date, COUNT(*) as count
FROM subscribers
GROUP BY DATE(subscribed_at);
```

### Buscar por email
```sql
SELECT * FROM subscribers WHERE email LIKE '%@example.com%';
```

### Desactivar suscriptor
```sql
UPDATE subscribers SET is_active = 0 WHERE email = 'test@example.com';
```

---

¿Necesitas más consultas o funcionalidades? ¡Consulta `server/database.js`!
