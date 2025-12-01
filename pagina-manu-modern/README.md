# Pagina Manu - Versión Moderna 🚀

Proyecto migrado de HTML/CSS/JS puro a **React + Vite + Tailwind CSS** con componentes modernos y animaciones profesionales.

## 🎨 Stack Tecnológico

- **React 18** - Biblioteca UI moderna
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones fluidas y profesionales
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas
- **Lucide React** - Iconos modernos

## ✨ Características

### 🕐 Countdown Animado
- Cuenta regresiva hasta Abril 1, 2026
- Animaciones de entrada con Framer Motion
- Efectos hover interactivos
- Diseño glassmorphism con tema oscuro/terror

### 📊 Barra de Progreso
- Progreso visual de Abril 2025 → Abril 2026
- Texto dinámico que cambia cada 1.5s
- Icono animado que se mueve con el progreso
- Efectos de brillo (sheen effect)

### 🔔 Modal de Suscripción (NUEVO)
- Formulario validado con React Hook Form + Zod
- Animaciones de entrada/salida suaves
- Toast notifications
- Diseño responsivo y accesible

### 🎭 Efectos Visuales
- Fondo con overlay radial gradient
- Efecto de "venas de sangre" animado
- Text shadows personalizados
- Glassmorphism y backdrop-filter

## 📂 Estructura del Proyecto

\`\`\`
src/
├── components/
│   ├── ui/
│   │   ├── button.jsx          # Botón reutilizable
│   │   ├── input.jsx           # Input con estilos
│   │   ├── dialog.jsx          # Modal/Dialog
│   │   └── toast.jsx           # Sistema de notificaciones
│   ├── Countdown.jsx           # Componente de cuenta regresiva
│   ├── ProgressBar.jsx         # Barra de progreso animada
│   └── SubscriptionModal.jsx   # Modal de suscripción
├── hooks/
│   └── useCountdown.js         # Hook personalizado para countdown
├── lib/
│   └── utils.js                # Utilidades (cn para clases)
├── App.jsx                     # Componente principal
├── index.css                   # Estilos globales + Tailwind
└── main.jsx                    # Entry point
\`\`\`

## 🚀 Comandos

### Desarrollo
\`\`\`bash
npm run dev
\`\`\`
Inicia el servidor de desarrollo en http://localhost:5173

### Build
\`\`\`bash
npm run build
\`\`\`
Crea la versión optimizada para producción en \`dist/\`

### Preview
\`\`\`bash
npm run preview
\`\`\`
Previsualiza el build de producción

## 🎨 Paleta de Colores

El proyecto usa una paleta personalizada "blood" en Tailwind:

- \`blood-50\` a \`blood-900\`: Tonos de rojo para el tema oscuro
- Efectos de sombra y brillo personalizados
- Gradientes animados

## 🔧 Configuración

### Tailwind Config
- Colores personalizados (blood palette)
- Animaciones custom (float, glow)
- Utilidades extendidas

### Framer Motion
- Animaciones de entrada (fadeIn, scale)
- Transiciones de página
- Efectos hover interactivos

## 📱 Responsive Design

- **Mobile First**: Diseñado primero para móvil
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Grid adaptable**: 2 columnas en móvil, 4 en desktop

## 🎯 Próximas Mejoras

- [ ] Integrar Supabase/Firebase para guardar suscriptores
- [ ] Añadir sistema de emails (Resend/EmailJS)
- [ ] Efectos de partículas flotantes
- [ ] Modo oscuro/claro toggle
- [ ] Más animaciones interactivas

## 🌐 Deploy

### Opciones recomendadas (todas gratuitas):

#### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

#### Netlify
\`\`\`bash
npm run build
# Arrastra la carpeta dist/ a netlify.com/drop
\`\`\`

#### GitHub Pages
\`\`\`bash
npm run build
# Configura GitHub Pages para usar la carpeta dist/
\`\`\`

## 📝 Notas

- El proyecto mantiene el tema oscuro/terror del original
- Las imágenes están en \`public/\`
- El modal de suscripción actualmente simula el envío (añade tu backend)

## 🤝 Comparación con la Versión Anterior

| Característica | Versión Antigua | Versión Nueva |
|----------------|----------------|---------------|
| Framework | HTML/CSS/JS | React + Vite |
| Estilos | CSS puro | Tailwind CSS |
| Animaciones | CSS @keyframes | Framer Motion |
| Formularios | Vanilla JS | React Hook Form + Zod |
| Componentes | No | Sí, modulares |
| Performance | Buena | Excelente |
| Desarrollo | Más lento | Más rápido (HMR) |
| Escalabilidad | Limitada | Alta |

---

**Construido con ❤️ usando React + Vite + Tailwind + Framer Motion**
