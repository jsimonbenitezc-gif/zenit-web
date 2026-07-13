/* ============================================================
   descargas.js — Descarga directa del binario de la última versión
   ------------------------------------------------------------
   Convierte los botones que apuntan a la PÁGINA de releases de GitHub
   en enlaces de DESCARGA DIRECTA del archivo correcto (.exe o .apk).

   Es a prueba de versiones: consulta la API de GitHub y apunta al
   asset más reciente, aunque cambie el número de versión.
   - Windows: resuelve el .exe de la última release publicada.
   - Android: busca el .apk más reciente ENTRE las releases (el APK puede
     no estar en la release "latest" si esa es solo del desktop).
   Si la API falla, el botón mantiene un enlace de respaldo (nunca da error).
   ============================================================ */
(function () {
  var REPO = 'jsimonbenitezc-gif/zenit-pos';
  var esAndroid = /android/i.test(location.pathname);

  // Botones que hoy apuntan a la página de releases (no a un archivo)
  var botones = Array.prototype.filter.call(
    document.querySelectorAll('a[href*="/releases/latest"]'),
    function (a) { return !/\/download\//.test(a.href); }
  );
  if (!botones.length) return;

  function setHref(url) { botones.forEach(function (a) { a.href = url; }); }

  if (esAndroid) {
    // Respaldo inmediato con nombre estable (el APK siempre se sube como Zenit.apk).
    setHref('https://github.com/' + REPO + '/releases/latest/download/Zenit.apk');

    // Resolución robusta: recorre las últimas releases y toma el primer .apk
    // (la lista viene de la más nueva a la más vieja).
    fetch('https://api.github.com/repos/' + REPO + '/releases?per_page=30', {
      headers: { 'Accept': 'application/vnd.github+json' }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rels) {
        if (!Array.isArray(rels)) return;
        for (var i = 0; i < rels.length; i++) {
          var apk = (rels[i].assets || []).filter(function (a) { return /\.apk$/i.test(a.name); })[0];
          if (apk) { setHref(apk.browser_download_url); return; }
        }
      })
      .catch(function () { /* se mantiene el respaldo; sin errores visibles */ });
    return;
  }

  // Windows: resuelve el .exe de la última release publicada.
  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {
    headers: { 'Accept': 'application/vnd.github+json' }
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rel) {
      if (!rel || !rel.assets) return;
      var exe = rel.assets.filter(function (a) { return /\.exe$/i.test(a.name); })[0];
      if (exe) setHref(exe.browser_download_url);
    })
    .catch(function () { /* se mantiene el respaldo; sin errores visibles */ });
})();
