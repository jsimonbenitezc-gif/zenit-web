# Zenit Software — Sitio web de descargas

Landing page estática para distribuir **Zenit POS** (Windows + Android) vía GitHub Pages.

- **En vivo:** https://jsimonbenitezc-gif.github.io/zenit-web/
- **Repo del sitio:** `jsimonbenitezc-gif/zenit-web` (público)
- **Repo de los binarios / releases:** `jsimonbenitezc-gif/zenit-pos` (público)

## Estructura

```
zenit-website/
├── index.html              # Página principal (hero, botones, features, empresa)
├── descargar-windows.html  # Tutorial de instalación en Windows (alerta SmartScreen)
├── descargar-android.html  # Tutorial de instalación en Android (Play Protect)
├── descargas.js            # Convierte los botones en descarga directa del último release
├── styles.css              # Todos los estilos
├── .nojekyll               # Evita que GitHub Pages procese el sitio con Jekyll
└── assets/img/
    ├── logo.png            # Logo de Zenit (montaña)
    ├── favicon.png         # Ícono de pestaña
    └── (aquí van tus capturas reales del software)
```

## ⚙️ Cómo funcionan las descargas (automático, no requiere edición)

Los binarios **no** viven en este sitio: se descargan desde las *Releases* del repo
`zenit-pos`. El flujo es:

1. Los botones "Descargar" de la **página de inicio** llevan primero a los tutoriales
   (`descargar-windows.html` / `descargar-android.html`), para que el usuario vea el aviso
   de la alerta de seguridad **antes** de descargar.
2. Dentro de cada tutorial, `descargas.js` consulta la API de GitHub, encuentra el archivo
   de la **última release** (`.exe` para Windows, `.apk` para Android) y apunta los botones
   a la **descarga directa** de ese archivo.
3. Si la consulta a la API fallara, los botones caen de respaldo al enlace
   `.../releases/latest` (la página de releases), así que nunca dan error.

> ✅ Es **a prueba de versiones**: al publicar un release nuevo en `zenit-pos` no hay que
> tocar la web. El script siempre resuelve el archivo más reciente.
>
> Para el proceso de crear releases (⚠️ renombrar el `.exe` de espacios a guiones o se
> rompe el auto-update del desktop), ver las notas del proyecto.

## 🖼️ Capturas del software (opcional pero recomendado)
Coloca tus imágenes en `assets/img/` y reemplaza los bloques de marcador de posición:

- En `index.html`, cada `<div class="captura__ph">…</div>` → `<img src="assets/img/tu-captura.png" alt="…" />`
- En los tutoriales, cada `<div class="captura-paso__ph">…</div>` → `<img src="assets/img/tu-captura.png" alt="…" />`

Los diálogos de Windows/Android ya están **recreados en HTML** (no necesitan captura).

## 🚀 Publicar / actualizar en GitHub Pages

El sitio ya está publicado. Para **actualizarlo** tras editar archivos, sube los archivos
cambiados al repo `zenit-web` (por la web: *Add file → Upload files*, o por Git):

```bash
cd zenit-website
git add .
git commit -m "Actualizar sitio"
git push
```

GitHub Pages se reconstruye solo en ~1 minuto. Config actual:
**Settings → Pages → Deploy from a branch**, rama `main`, carpeta `/ (root)`.

### Dominio propio (opcional)
Si compras un dominio (p. ej. `zenitpos.com`), en **Settings → Pages → Custom domain** lo
agregas y creas un archivo `CNAME` con el dominio dentro.

## Vista previa local
```bash
# desde la carpeta del proyecto
py -m http.server 4599 --directory zenit-website
# luego abre http://localhost:4599
```
