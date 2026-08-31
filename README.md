# Ley 73 — Espinoza Pymes · Sitio estático para GitHub Pages

Sitio de producción en **HTML + CSS + JS vanilla** (sin React, sin build). Sube estos archivos tal cual a tu repositorio.

## Archivos

- `index.html` — toda la página (contenido y estructura; edita textos aquí).
- `styles.css` — estilos y tokens de diseño (colores/tipografía en `:root`).
- `main.js` — interactividad: menú móvil, verificador NSS, FAQ, modal de videos, barra de accesibilidad.
- `.nojekyll` — evita que GitHub Pages procese el sitio con Jekyll.

## Cómo publicar en GitHub Pages

1. Copia estos archivos a la **raíz** del repositorio (o a `/docs`).
2. En GitHub: **Settings → Pages → Source**: rama `main`, carpeta `/ (root)` (o `/docs`).
3. Si usas el dominio `ley73.com`, agrega un archivo `CNAME` con una sola línea: `ley73.com` y configura el DNS (registro A/CNAME hacia GitHub Pages).

No hay paso de build: cualquier edición a estos 3 archivos se publica al hacer push.

## Pendientes para producción

- **Logo**: sustituir el bloque "EP" (`.brand-mark`) por el logo oficial (`espinozapymes.com/imagenes/consultoria.png`) con `<img>`.
- **Fotos**: reemplazar los placeholders rayados del hero y "Sobre nosotros".
- **Encuesta**: conectar la URL real en `main.js` (busca `surveyBtn`).
- **Videos "Cómo llegar"**: colocar los `.mp4` en `/videos` y editar el stub del modal en `main.js` (busca `data-video`).
- **Mapas**: opcionalmente sustituir los mapas placeholder por iframes de Google Maps.
