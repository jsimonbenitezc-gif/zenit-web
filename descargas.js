/* ============================================================
   descargas.js — Descarga directa del binario de la última versión
   ------------------------------------------------------------
   Convierte los botones que apuntan a la PÁGINA de releases de GitHub
   en enlaces de DESCARGA DIRECTA del archivo correcto (.exe o .apk).

   Es a prueba de versiones: consulta la API de GitHub y apunta al
   asset de la última release, aunque cambie el número de versión.
   Si la API falla, el botón mantiene el enlace a la página de releases
   como respaldo (nunca da error).
   ============================================================ */
(function () {
  var REPO = 'jsimonbenitezc-gif/zenit-pos';
  var esAndroid = /android/i.test(location.pathname);
  var ext = esAndroid ? /\.apk$/i : /\.exe$/i;

  // Botones que hoy apuntan a la página de releases (no a un archivo)
  var botones = Array.prototype.filter.call(
    document.querySelectorAll('a[href*="/releases/latest"]'),
    function (a) { return !/\/download\//.test(a.href); }
  );
  if (!botones.length) return;

  // Respaldo inmediato con nombre estable (el APK siempre se llama Zenit.apk).
  // El .exe lleva la versión en el nombre, así que ese lo resolvemos por API.
  if (esAndroid) {
    var apkDirecto = 'https://github.com/' + REPO + '/releases/latest/download/Zenit.apk';
    botones.forEach(function (a) { a.href = apkDirecto; });
  }

  // Resolución exacta del asset de la última release publicada.
  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {
    headers: { 'Accept': 'application/vnd.github+json' }
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rel) {
      if (!rel || !rel.assets) return;
      var asset = rel.assets.filter(function (a) { return ext.test(a.name); })[0];
      if (asset) {
        botones.forEach(function (a) { a.href = asset.browser_download_url; });
      }
    })
    .catch(function () { /* se mantiene el respaldo; sin errores visibles */ });
})();
