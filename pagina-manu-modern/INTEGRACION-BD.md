# Guía de Integración de Base de Datos 🗄️

Esta guía te ayudará a conectar el modal de suscripción con una base de datos real.

## Opción 1: Supabase (Recomendado) 🚀

### 1. Instalar Supabase
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

### 2. Crear cuenta y proyecto
1. Ve a https://supabase.com
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Guarda tu API URL y anon key

### 3. Configurar Supabase

Crea \`src/lib/supabase.js\`:
\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
\`\`\`

### 4. Crear archivo .env
\`\`\`
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
\`\`\`

### 5. Crear tabla en Supabase

SQL para crear la tabla:
\`\`\`sql
CREATE TABLE subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

### 6. Actualizar SubscriptionModal.jsx

Reemplaza la función \`onSubmit\`:
\`\`\`javascript
import { supabase } from '../lib/supabase'

const onSubmit = async (data) => {
  setIsSubmitting(true)

  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([
        { name: data.name, email: data.email }
      ])

    if (error) throw error

    addToast('¡Suscripción exitosa! Te mantendremos informado.', 'success')
    reset()
    onOpenChange(false)
  } catch (error) {
    if (error.code === '23505') {
      addToast('Este email ya está registrado', 'error')
    } else {
      addToast('Error al suscribirse. Intenta de nuevo.', 'error')
    }
  } finally {
    setIsSubmitting(false)
  }
}
\`\`\`

---

## Opción 2: Firebase 🔥

### 1. Instalar Firebase
\`\`\`bash
npm install firebase
\`\`\`

### 2. Configurar Firebase

Crea \`src/lib/firebase.js\`:
\`\`\`javascript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
\`\`\`

### 3. Actualizar SubscriptionModal.jsx

\`\`\`javascript
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const onSubmit = async (data) => {
  setIsSubmitting(true)

  try {
    await addDoc(collection(db, 'subscribers'), {
      name: data.name,
      email: data.email,
      createdAt: new Date()
    })

    addToast('¡Suscripción exitosa! Te mantendremos informado.', 'success')
    reset()
    onOpenChange(false)
  } catch (error) {
    addToast('Error al suscribirse. Intenta de nuevo.', 'error')
  } finally {
    setIsSubmitting(false)
  }
}
\`\`\`

---

## Opción 3: EmailJS (Solo emails, sin BD) 📧

### 1. Instalar EmailJS
\`\`\`bash
npm install @emailjs/browser
\`\`\`

### 2. Configurar EmailJS
1. Ve a https://www.emailjs.com
2. Crea una cuenta
3. Configura un servicio de email
4. Crea un template

### 3. Actualizar SubscriptionModal.jsx

\`\`\`javascript
import emailjs from '@emailjs/browser'

const onSubmit = async (data) => {
  setIsSubmitting(true)

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_name: 'Manuel',
        from_name: data.name,
        from_email: data.email,
        message: \`Nueva suscripción de \${data.name}\`
      },
      'YOUR_PUBLIC_KEY'
    )

    addToast('¡Suscripción exitosa! Te mantendremos informado.', 'success')
    reset()
    onOpenChange(false)
  } catch (error) {
    addToast('Error al suscribirse. Intenta de nuevo.', 'error')
  } finally {
    setIsSubmitting(false)
  }
}
\`\`\`

---

## Opción 4: Resend (Emails modernos) ✉️

### 1. Crear API en Resend
1. Ve a https://resend.com
2. Crea una cuenta (100 emails/día gratis)
3. Obtén tu API key

### 2. Crear API Route (necesitas backend)

Si usas Next.js o un backend simple:
\`\`\`javascript
// api/subscribe.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { name, email } = await request.json()

  try {
    await resend.emails.send({
      from: 'noticias@tudominio.com',
      to: email,
      subject: '¡Bienvenido a las noticias!',
      html: \`<h1>Hola \${name}!</h1><p>Gracias por suscribirte.</p>\`
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response('Error', { status: 500 })
  }
}
\`\`\`

---

## Comparación de Opciones

| Opción | Dificultad | Costo | Base de Datos | Emails | Mejor para |
|--------|-----------|-------|---------------|--------|------------|
| **Supabase** | Media | Gratis | ✅ | ❌ | App completa con BD |
| **Firebase** | Media | Gratis | ✅ | ❌ | Apps React/Vue |
| **EmailJS** | Fácil | Gratis* | ❌ | ✅ | Solo notificaciones |
| **Resend** | Media | Gratis* | ❌ | ✅ | Emails profesionales |

*Limitaciones en tier gratuito

---

## Mi Recomendación 💡

Para tu caso específico:

1. **Si solo quieres guardar emails**: **Supabase** (más simple, no necesitas backend)
2. **Si quieres enviar emails de bienvenida**: **EmailJS + Supabase** (combo perfecto)
3. **Si planeas escalar mucho**: **Firebase** (ecosistema completo)

---

## Archivo .env.example

Crea este archivo para documentar las variables:
\`\`\`
# Supabase
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key

# Firebase (alternativa)
VITE_FIREBASE_API_KEY=tu_key
VITE_FIREBASE_PROJECT_ID=tu_proyecto

# EmailJS (opcional para emails)
VITE_EMAILJS_SERVICE_ID=tu_servicio
VITE_EMAILJS_TEMPLATE_ID=tu_template
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
\`\`\`

---

¿Necesitas ayuda con alguna integración específica? ¡Pregúntame!
