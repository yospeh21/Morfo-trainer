# MORFO-TRAINER

Entrenamiento virtual de anatomía ósea para el curso VACS Morfofisiología I
(Universidad del Magdalena). Aplicación de una sola página (HTML/CSS/JS
vanilla, sin frameworks ni paso de build) con backend en Google Sheets vía
Google Apps Script.

**En producción:** https://TU-SITIO.netlify.app *(actualiza este link)*

## Estructura del proyecto

```
morfotrainer/
├── index.html          # Shell HTML, enlaza css/js
├── css/
│   └── styles.css       # Todo el estilo (tema "arcade de huesos")
├── js/
│   └── app.js            # Toda la lógica (una sola IIFE)
├── backend/
│   └── apps-script.js    # Código del backend (Google Apps Script) — referencia
└── README.md
```

## Cómo correrlo localmente

Es HTML/CSS/JS puro, no necesita build ni npm install. Basta con un
servidor estático simple (abrir el archivo directo con `file://` puede
fallar por CORS al llamar al backend):

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Arquitectura del frontend (js/app.js)

Todo vive en una única IIFE con un patrón de render manual (sin framework):

- **`state`** — objeto global con todo el estado de la sesión (estudiante,
  progreso, cronómetros, etc.)
- **`MODULES`** / **`CATEGORIES`** — el contenido del curso, organizado en
  categorías macro → módulos (temas) → niveles (actividades). Cada nivel
  tiene un `type`: `'sort'` (arrastrar y clasificar), `'match'` (emparejar
  términos/definiciones) o `'mc'` (selección múltiple).
- **`render()`** — limpia `#app` y vuelve a construir la vista actual según
  `state.view`, usando el mapa `views{}`. Cualquier vista nueva se registra
  ahí.
- Cada `view*()` función construye y retorna un `<div>` con `document`
  DOM APIs puras (sin JSX, sin plantillas).
- **Cronómetro por actividad**: `startModuleTimer` / `pauseActiveTimer` /
  `completeModuleTimer`. Se pausa solo al cambiar de pestaña
  (`visibilitychange`) o al salir de las vistas de un módulo — ver el
  arranque de `render()`.
- **Backend**: `apiGet()` / `apiPost()` llaman al Web App de Google Apps
  Script (ver `backend/apps-script.js`). Todo el guardado (perfiles,
  resultados, cronómetros) vive en una hoja de Google, no en el navegador.

## Contenido pendiente / roadmap

Los módulos C-F (cráneo y cuello, columna, tórax, cintura escapular) están
armados como *placeholders* con 4-5 sub-actividades cada uno
(`SUB_ACTIVITY_TEMPLATE()` en `app.js`), marcadas `ready:false`. Para
activar una:

1. El profesor entrega el contenido verificado contra las fuentes del curso
   (Pró, Tortora).
2. Se agrega como un nuevo `level` (o sub-actividad) dentro del módulo
   correspondiente en `MODULES`.
3. Se marca `ready:true` en el `subActivities` correspondiente.

Pendiente de diseñar/construir:
- Actividades basadas en imágenes anatómicas (arrastrar a puntos marcados,
  identificar uno por uno) — necesita imágenes + coordenadas de los
  marcadores.
- Casos clínicos.
- "Repaso combinado" (elegir cantidad de preguntas, mezclando las demás
  categorías de un tema) — el mecanismo real se construye una vez haya
  contenido real que mezclar.

## Backend (Google Apps Script + Google Sheets)

El archivo `backend/apps-script.js` es una copia de referencia del código
desplegado en Google Apps Script. **La fuente de verdad real vive en el
editor de Apps Script de la hoja de Google**, no en este repo — si lo
editas aquí, tienes que copiar el cambio manualmente allá y volver a
implementar (Implementar → Administrar implementaciones → Nueva versión).

Hojas usadas:
- **Perfiles**: progreso en curso + cronómetros por estudiante (para poder
  continuar donde quedaron).
- **Resultados**: informes enviados (auto-guardado al completar cada
  nivel), lo que ve el panel del monitor.
- **Estudiantes**: código estudiantil → nombre, para el login.

Acciones soportadas (`?action=`): `ping`, `lookupName`, `getProfile`,
`listResults` *(requiere `pass`)*, `listProfiles` *(requiere `pass`)`,
`saveProfile` (POST), `saveResult` (POST).

## Despliegue

El sitio se publica arrastrando `index.html` (y las carpetas `css/`, `js/`)
a la pestaña **Deploys** del proyecto en Netlify — ver la sección de
Netlify si vas a automatizar esto conectando un repo de GitHub en vez de
arrastrar archivos a mano.

## Principios de diseño a respetar

- **Fidelidad de fuente**: cada pregunta/dato anatómico debe poder
  rastrearse a un pasaje específico de Pró o Tortora. No inventar
  contenido.
- **Sin `localStorage`/`sessionStorage`** — no funcionan de forma
  confiable en todos los entornos donde se ha probado esto; todo el
  guardado pasa por el backend de Sheets.
- **Un archivo, sin build step** — mantenerlo así mientras sea viable;
  facilita el despliegue por arrastre a Netlify sin pipeline de CI.
