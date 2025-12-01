import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Crear/abrir base de datos
const db = new Database(path.join(__dirname, 'subscribers.db'))

// Crear tabla de suscriptores si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1
  )
`)

// Funciones para manejar suscriptores
export const subscriberDB = {
  // Verificar si un email ya está registrado
  exists(email) {
    const stmt = db.prepare('SELECT id FROM subscribers WHERE email = ?')
    return stmt.get(email) !== undefined
  },

  // Agregar nuevo suscriptor
  add(name, email) {
    const stmt = db.prepare('INSERT INTO subscribers (name, email) VALUES (?, ?)')
    try {
      const result = stmt.run(name, email)
      return { success: true, id: result.lastInsertRowid }
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        return { success: false, error: 'Email ya registrado' }
      }
      throw error
    }
  },

  // Obtener suscriptor por email
  getByEmail(email) {
    const stmt = db.prepare('SELECT * FROM subscribers WHERE email = ?')
    return stmt.get(email)
  },

  // Obtener todos los suscriptores activos
  getAll() {
    const stmt = db.prepare('SELECT * FROM subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC')
    return stmt.all()
  },

  // Contar suscriptores
  count() {
    const stmt = db.prepare('SELECT COUNT(*) as total FROM subscribers WHERE is_active = 1')
    return stmt.get().total
  }
}

export default db
