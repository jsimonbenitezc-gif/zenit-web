# Zenit Software — Sitio web de descargas

Landing page estática para distribuir **Zenit POS** (Windows + Android) vía GitHub Pages.

## Estructura

```
zenit-website/
├── index.html              # Página principal (hero, botones, features, empresa)
├── descargar-windows.html  # Tutorial de instalación en Windows (alerta SmartScreen)
├── descargar-android.html  # Tutorial de instalación en Android (Play Protect)
├── styles.css              # Todos los estilos
├── .nojekyll               # Evita que GitHub Pages procese el sitio con Jekyll
└── assets/img/
    ├── logo.png            # Logo de Zenit (montaña)
    ├── favicon.png         # Ícono de pestaña
    └── (aquí van tus capturas reales del software)
```

## 🔧 Lo que TIENES que editar antes de publicar

### 1. Enlaces de descarga
Busca en los 3 HTML los comentarios `⬇️ REEMPLAZA` y cambia el `href` por el enlace directo
a tus archivos. Recomendado: subir el instalador y el APK como *assets* de una **GitHub Release**.

- **Windows** (`.exe`): p. ej. `https://github.com/jsimonbenitezc-gif/zenit-pos/releases/latest/download/Zenit-POS-Setup.exe`
- **Android** (`.apk`): p. ej. `https://github.com/jsimonbenitezc-gif/zenit-pos/releases/latest/download/Zenit.apk`

> Nota: si el repo `zenit-pos` es **privado**, los enlaces `releases/latest/download/...` no serán
> accesibles para el público. Usa un repo público para los binarios, o publica los archivos como
> release en el mismo repo del sitio web.

### 2. Capturas del software (opcional pero recomendado)
Coloca tus imágenes en `assets/img/` y reemplaza los bloques de marcador de posición:

- En `index.html`, cada `<div class="captura__ph">…</div>` → `<img src="assets/img/tu-captura.png" alt="…" />`
- En los tutoriales, cada `<div class="captura-paso__ph">…</div>` → `<img src="assets/img/tu-captura.png" alt="…" />`

Los diálogos de Windows/Android ya están **recreados en HTML** (no necesitan captura), pero si
prefieres fotos reales, puedes reemplazarlos.

## 🚀 Publicar en GitHub Pages

**Opción A — repo dedicado (recomendado):**
1. Crea un repo público, p. ej. `zenit-web`.
2. Sube el **contenido** de esta carpeta (que `index.html` quede en la raíz del repo).
   ```bash
   cd zenit-website
   git init
   git add .
   git commit -m "Sitio web de descargas Zenit"
   git branch -M main
   git remote add origin https://github.com/jsimonbenitezc-gif/zenit-web.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   rama `main`, carpeta `/ (root)`. Guarda.
4. En ~1 minuto estará en `https://jsimonbenitezc-gif.github.io/zenit-web/`.

**Opción B — carpeta `/docs` en un repo existente:** copia estos archivos a `docs/` y en
**Settings → Pages** elige la carpeta `/docs`.

### Dominio propio (opcional)
Si compras un dominio (p. ej. `zenitpos.com`), en **Settings → Pages → Custom domain** lo agregas
y creas un archivo `CNAME` con el dominio dentro.

## Vista previa local
Abre `index.html` directamente en el navegador, o sirve la carpeta:
```bash
npx serve .
```
