# Contexto para Claude Code

Este proyecto viene de una sesión larga e iterativa en claude.ai (chat +
artifacts), migrada a Claude Code para poder crecer de forma más ordenada.
Antes de tocar código, lee `README.md` para la arquitectura general.

## Cosas que YA funcionan y no hay que romper

- Login por código estudiantil contra la hoja "Estudiantes" (autocompleta
  el nombre, no editable).
- Progreso persistente por estudiante (Perfiles), resultados auto-guardados
  al monitor (Resultados) — todo vía `apiGet`/`apiPost` a Apps Script.
- Cronómetro individual por módulo (tema), con pausa/reanudación por
  visibilidad de pestaña, y congelado permanente tras la primera vez que
  se completan los 4 niveles de un módulo (modo práctica libre después).
- Panel del monitor con clave (verificada del lado del servidor, no en el
  cliente) y vista por actividad (nombre + estado + puntaje + tiempo).
- Boss Battle: mezcla preguntas tipo `mc` de los módulos de la categoría
  actual, cronometrado.

## Convenciones del código existente

- Vanilla JS, sin framework, sin build. Todo dentro de una IIFE en
  `js/app.js`.
- Construcción de DOM con un helper `el(tag, className, innerHTML)` — no
  hay JSX ni plantillas de string sueltas fuera de eso.
- Cada pantalla es una función `view*()` que retorna un elemento DOM;
  se registran en el objeto `views` dentro de `render()`.
- `render()` reconstruye TODO `#app` en cada llamada (no hay diffing).
  Por eso: nunca dependas de que un elemento persista entre renders sin
  volver a construirlo.
- Los colores/tipografías salen de variables CSS en `:root` (`css/styles.css`)
  — evita hardcodear colores nuevos, añade una variable si hace falta un
  tono nuevo (mira cómo se hizo con `--blue`).
- `esc()` SIEMPRE antes de insertar cualquier dato dinámico (nombre,
  código, texto del backend) en `innerHTML`, sin excepción — hay un bug ya
  corregido en el historial de este proyecto donde un dato numérico rompió
  esta función; ahora es robusta a cualquier tipo, pero el hábito de usarla
  en todo string dinámico debe mantenerse.
- Antes de tocar el sistema de cronómetro o el `render()` central, revisa
  el bloque `MODULE_TIMER_VIEWS` y la pausa centralizada al inicio de
  `render()` — ahí es donde se decide cuándo pausar, no repartido en cada
  botón de salida.

## Errores ya vividos en este proyecto (para no repetirlos)

- Llamar a `render()` de forma recursiva DENTRO de una función `view*()`
  que todavía se está construyendo duplica contenido en el DOM. Los
  cambios de estado que terminan un nivel/actividad deben hacerse desde
  manejadores de eventos (`onclick`, callbacks async), nunca desde el
  cuerpo síncrono de una función `view*()`.
- El backend de Apps Script NO actualiza automáticamente la fila de
  encabezados de una hoja existente cuando cambian las columnas — por eso
  `getOrCreateSheet()` en el backend ahora se auto-corrige comparando y
  reescribiendo la fila 1 si no coincide con el esquema esperado. Si
  agregas una columna nueva a algún `*_HEADERS`, confirma que ese
  auto-heal sigue cubriendo el caso.
- `window.storage` (el storage nativo de artifacts de Claude.ai) no está
  disponible fuera del visor de Claude — por eso todo el guardado se migró
  a Google Sheets. No reintroducir `window.storage` como dependencia.

## Cuando agregues contenido nuevo (preguntas, módulos)

- El profesor entrega el contenido ya redactado (pregunta, opciones,
  respuesta correcta, explicación) — no generar contenido anatómico nuevo
  sin que él lo confirme, dado el estándar de fidelidad de fuente del
  curso.
- Sigue el patrón de los módulos A/B en `MODULES` como plantilla para la
  forma de los objetos `level`.

## Backend: automatizar despliegue con clasp

El usuario quiere dejar de copiar/pegar manualmente el backend en el
editor de Apps Script. Ver la sección "Despliegue automatizado con clasp"
en README.md para el procedimiento completo. Si el usuario no ha hecho
`clasp login` todavía, ese paso es interactivo (abre su navegador) — no
se puede completar sin que él participe activamente. Todo lo demás
(`clasp push`, `clasp deploy -i <id>`) sí se puede ejecutar y encadenar
por Claude Code una vez esté logueado y el proyecto clonado.
