/* Espinoza Pymes — Ley 73 · JS vanilla para GitHub Pages */
(function () {
  'use strict';

  /* Año en footer */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Menú móvil */
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('menuToggle');
  toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  /* Encuesta (placeholder — conectar URL real) */
  document.getElementById('surveyBtn').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Aquí se abriría la encuesta de Espinoza Consultoría.\nConecta la URL real en main.js (surveyBtn).');
  });

  /* ============ Verificador NSS (5 pares = 10 dígitos) ============ */
  var inputs = Array.prototype.slice.call(document.querySelectorAll('[data-nss]'));
  var verifyBtn = document.getElementById('nssVerifyBtn');
  var step1 = document.getElementById('nssStep1');
  var step2 = document.getElementById('nssStep2');
  var dots = [document.getElementById('stepDot1'), document.getElementById('stepDot2'), document.getElementById('stepDot3')];
  var lines = [document.getElementById('stepLine1'), document.getElementById('stepLine2')];
  var results = { ley73: document.getElementById('resLey73'), review: document.getElementById('resReview'), afore: document.getElementById('resAfore') };

  function allFilled() {
    return inputs.every(function (i) { return i.value.length === 2; });
  }
  function refreshBtn() {
    var ok = allFilled();
    verifyBtn.disabled = !ok;
    verifyBtn.style.opacity = ok ? '1' : '0.5';
  }
  inputs.forEach(function (input, idx) {
    input.addEventListener('input', function () {
      input.value = input.value.replace(/\D/g, '').slice(0, 2);
      if (input.value.length === 2 && idx < inputs.length - 1) inputs[idx + 1].focus();
      refreshBtn();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) inputs[idx - 1].focus();
    });
  });

  function setStep(n) {
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i + 1 <= n);
      d.classList.toggle('done', i + 1 < n);
      d.querySelector('.num').textContent = (i + 1 < n) ? '✓' : String(i + 1);
    });
    lines.forEach(function (l, i) { l.classList.toggle('done', i + 1 < n); });
  }

  verifyBtn.addEventListener('click', function () {
    if (!allFilled()) return;
    var pair2 = inputs[1].value;
    var yearNum = parseInt(pair2, 10);
    document.getElementById('nssDisplay').textContent = inputs.map(function (i) { return i.value; }).join(' ');
    Object.keys(results).forEach(function (k) { results[k].classList.add('hidden'); });
    if (yearNum <= 96) {
      results.ley73.classList.remove('hidden');
    } else if (yearNum === 97) {
      results.review.classList.remove('hidden');
    } else {
      document.getElementById('aforeYearPair').textContent = pair2;
      document.getElementById('aforeYear').textContent = String(1900 + yearNum);
      results.afore.classList.remove('hidden');
    }
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    setStep(2);
  });

  function resetNSS() {
    inputs.forEach(function (i) { i.value = ''; });
    refreshBtn();
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    setStep(1);
    inputs[0].focus();
  }
  document.getElementById('nssResetBtn1').addEventListener('click', resetNSS);
  document.getElementById('nssResetBtn2').addEventListener('click', resetNSS);

  /* ============ FAQ acordeón (una abierta a la vez) ============ */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ============ Modal de videos "Cómo llegar" ============ */
  var modal = document.getElementById('videoModal');
  var stub = document.getElementById('modalStub');
  var videoFiles = {
    JM: './src/Cómo_llegar_JM.mp4',
    Agropecuario: './src/Agropecuario.mp4'
  };
  document.querySelectorAll('.location-video').forEach(function (v) {
    v.addEventListener('click', function () {
      var name = v.getAttribute('data-video');
      var src = videoFiles[name];
      stub.innerHTML = '';
      if (src) {
        var video = document.createElement('video');
        video.src = encodeURI(src);
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.display = 'block';
        stub.appendChild(video);
      }
      modal.classList.add('open');
    });
  });
  function closeModal() {
    modal.classList.remove('open');
    stub.innerHTML = '';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ============ Barra de accesibilidad ============ */
  var html = document.documentElement;
  document.querySelectorAll('.a11y-bar [data-size]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      html.setAttribute('data-text-size', btn.getAttribute('data-size'));
      document.querySelectorAll('.a11y-bar [data-size]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('.a11y-bar [data-contrast]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      html.setAttribute('data-contrast', btn.getAttribute('data-contrast'));
      document.querySelectorAll('.a11y-bar [data-contrast]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
})();
