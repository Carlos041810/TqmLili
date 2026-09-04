const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelopeScreen');
const bookContainer = document.getElementById('bookContainer');
const flowerWrapper = document.getElementById('flowerWrapper');
const contentLeft = document.getElementById('contentLeft');
const contentRight = document.getElementById('contentRight');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const lilyField = document.querySelector('.lily-field');
const heartsBg = document.querySelector('.hearts-bg');

// Elementos cósmicos
const universeStage = document.getElementById('universeStage');
const cosmicCaption = document.getElementById('cosmicCaption');
const cosmicBouquet = document.getElementById('cosmicBouquet');
const cosmicMoon = document.getElementById('cosmicMoon');
const cosmicSun = document.getElementById('cosmicSun');
const cosmicGalaxy = document.getElementById('cosmicGalaxy');
const cosmicLove = document.getElementById('cosmicLove');

let currentStep = 1; 
// 1: Día (Lirio der)
// 2: Noche (Lirio izq)
// 3: Ramo vs Luna
// 4: Luna vs Sol
// 5: Sol vs Galaxia
// 6: Amor infinito

function animateWords(container, delay = 240) {
  if (!container) return;
  if (!container.dataset.orig) container.dataset.orig = container.innerText.trim();
  const words = container.dataset.orig.split(/\s+/);

  container.innerHTML = words.map((w, i) => {
    const nbsp = i < words.length - 1 ? '&nbsp;' : '';
    return `<span class="word">${w}${nbsp}</span>`;
  }).join('');

  try { container.style.visibility = 'visible'; } catch (e) {}

  const spans = Array.from(container.querySelectorAll('.word'));
  spans.forEach((span, i) => {
    setTimeout(() => span.classList.add('show'), delay * i);
  });
}

function setCosmicCaption(text) {
  cosmicCaption.style.opacity = '0';
  cosmicCaption.style.transform = 'translateX(-50%) translateY(-10px)';
  setTimeout(() => {
    cosmicCaption.innerText = text;
    cosmicCaption.style.opacity = '1';
    cosmicCaption.style.transform = 'translateX(-50%) translateY(0)';
  }, 350);
}

function isMobileDevice() {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const smallViewport = window.innerWidth <= 920 && window.innerHeight <= 920;

  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
    || (coarsePointer && smallViewport);
}

function blockMobileBackNavigation() {
  if (!isMobileDevice() || window.__mobileBackLocked) return;

  window.__mobileBackLocked = true;

  const keepHistory = () => {
    window.history.pushState(null, '', window.location.href);
  };

  keepHistory();
  window.addEventListener('popstate', keepHistory, { passive: true });
  window.addEventListener('pageshow', keepHistory, { passive: true });
}

function updateOrientationState() {
  const mobile = isMobileDevice();
  const portrait = window.innerHeight > window.innerWidth;

  document.body.classList.toggle('mobile-portrait', mobile && portrait);

  if (prevBtn) {
    prevBtn.disabled = mobile;
    prevBtn.style.display = mobile ? 'none' : 'flex';
    prevBtn.style.pointerEvents = mobile ? 'none' : 'auto';
  }

  if (mobile) {
    blockMobileBackNavigation();
  } else {
    window.__mobileBackLocked = false;
  }

  if (mobile && portrait && screen.orientation && typeof screen.orientation.lock === 'function') {
    try {
      screen.orientation.lock('landscape');
    } catch (error) {
      // Safari / navegadores sin soporte no bloquean la experiencia; muestra el aviso visual.
    }
  }
}

window.addEventListener('resize', updateOrientationState);
window.addEventListener('orientationchange', updateOrientationState);
updateOrientationState();

// 1. Abrir Sobre
envelope.addEventListener('click', () => {
  if (typeof startMusic === 'function') startMusic();
  envelope.classList.add('open');

  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    bookContainer.classList.add('visible');
    flowerWrapper.classList.add('bloom');

    setTimeout(() => {
      flowerWrapper.classList.add('docked');
      contentLeft.classList.add('visible');

      const mainEl = document.getElementById('poemBox');
      const footerEl = document.getElementById('poemFooter');
      const delayMs = 240;

      animateWords(mainEl, delayMs);
      const mainCount = mainEl && mainEl.innerText ? mainEl.innerText.trim().split(/\s+/).length : 0;

      setTimeout(() => {
        if (footerEl) {
          if (!footerEl.dataset.orig) footerEl.dataset.orig = footerEl.innerText.trim();
          animateWords(footerEl, delayMs);
        }
      }, Math.max(0, mainCount * delayMs) + 200);
    }, 1800);
  }, 500);
});

// Administrador de la Escena Cósmica
function renderStep(step) {
  switch(step) {
    case 1:
      // Restaurar estado de día
      universeStage.classList.remove('active');
      contentRight.classList.remove('visible');
      contentLeft.classList.add('visible');
      lilyField.classList.remove('bouquet-forming', 'hidden');
      heartsBg.classList.remove('hidden');

      flowerWrapper.style.opacity = '1';
      flowerWrapper.classList.remove('docked-left');
      flowerWrapper.classList.add('docked');

      document.body.classList.remove('night-mode');
      bookContainer.classList.remove('night-mode');
      break;

    case 2:
      // Noche y Lirio a la izquierda
      universeStage.classList.remove('active');
      contentLeft.classList.remove('visible');
      lilyField.classList.remove('bouquet-forming', 'hidden');
      heartsBg.classList.remove('hidden');

      flowerWrapper.style.opacity = '1';
      flowerWrapper.classList.remove('docked');
      flowerWrapper.classList.add('docked-left');

      document.body.classList.add('night-mode');
      bookContainer.classList.add('night-mode');

      setTimeout(() => {
        contentRight.classList.add('visible');
        const nightPoem = document.getElementById('nightPoem');
        if (nightPoem && !nightPoem.dataset.animated) {
          nightPoem.dataset.animated = 'true';
          animateWords(nightPoem, 200);
        }
      }, 500);
      break;

    case 3:
      // Inicia Escala: Ramo vs Luna
      contentRight.classList.remove('visible');
      flowerWrapper.style.opacity = '0';
      lilyField.classList.add('bouquet-forming', 'hidden');
      heartsBg.classList.add('hidden');

      universeStage.classList.add('active');
      setCosmicCaption("Un ramo de flores es pequeño frente a la inmensidad de la Luna...");

      // Se ocultan los lirios del fondo y aparece el ramo ilustrado
      cosmicBouquet.style.opacity = '1';
      cosmicBouquet.style.left = '25%';
      cosmicBouquet.style.top = '50%';
      cosmicBouquet.style.transform = 'translate(-50%, -50%) scale(1)';

      // Posicionar Luna a la derecha
      cosmicMoon.style.opacity = '1';
      cosmicMoon.style.left = '70%';
      cosmicMoon.style.top = '50%';
      cosmicMoon.style.transform = 'translate(-50%, -50%) scale(1)';

      // Apagar Sol
      cosmicSun.style.opacity = '0';
      cosmicSun.style.transform = 'translate(100%, -50%) scale(0.2)';
      break;

    case 4:
      // Luna vs Sol
      lilyField.classList.add('hidden');
      setCosmicCaption("Pero la Luna es apenas un grano de polvo comparada con el Sol...");

      // El ramo desaparece para dejar paso a la comparación lunar
      cosmicBouquet.style.opacity = '0';
      cosmicBouquet.style.transform = 'translate(-120%, -50%) scale(0.3)';

      // Restaurar la luna para que vuelva a verse al regresar desde el siguiente paso
      cosmicMoon.style.opacity = '1';
      cosmicMoon.style.left = '18%';
      cosmicMoon.style.top = '50%';
      cosmicMoon.style.transform = 'translate(-50%, -50%) scale(0.22)';

      // Entra el Sol colosal por la derecha, manteniendo una posición equilibrada
      cosmicSun.style.opacity = '1';
      cosmicSun.style.left = '72%';
      cosmicSun.style.top = '46%';
      cosmicSun.style.transform = 'translate(-50%, -50%) scale(1)';

      // Apagar Galaxia
      cosmicGalaxy.style.opacity = '0';
      cosmicGalaxy.style.transform = 'translate(100%, -50%) scale(0.1)';
      break;
case 5:
      // Sol vs Galaxia
      lilyField.classList.add('hidden');
      setCosmicCaption("Y el Sol desaparece por completo dentro de los brazos de una Galaxia...");

      cosmicMoon.style.opacity = '0';
      cosmicSun.style.opacity = '1';
      cosmicSun.style.left = '15%';
      cosmicSun.style.top = '50%';
      cosmicSun.style.transform = 'translate(-50%, -50%) scale(0.08)';

      // Galaxia grande en el centro/derecha
      cosmicGalaxy.style.opacity = '1';
      cosmicGalaxy.style.left = '65%';
      cosmicGalaxy.style.top = '50%';
      cosmicGalaxy.style.transform = 'translate(-50%, -50%) scale(1)';

      // Apagar Amor si se regresa desde el paso 6
      cosmicLove.style.opacity = '0';
      cosmicLove.style.transform = 'translate(100%, -50%) scale(0.2)';
      break;

    case 6:
      // El Amor frente a la Galaxia (Comparativa final)
      lilyField.classList.add('hidden');
      setCosmicCaption("Pero ni juntando cada estrella de este universo... nada se compara con lo que siento por ti.");

      // Se desvanece el sol del paso anterior
      cosmicSun.style.opacity = '0';

      // La Galaxia se reduce a escala miniatura y se ubica al lado izquierdo
      cosmicGalaxy.style.opacity = '0.9';
      cosmicGalaxy.style.left = '24%';
      cosmicGalaxy.style.top = '52%';
      cosmicGalaxy.style.transform = 'translate(-50%, -50%) scale(0.18)';

      // El corazón florece al lado derecho de la galaxia
      setTimeout(() => {
        cosmicLove.style.opacity = '1';
        cosmicLove.style.left = '68%';
        cosmicLove.style.top = '52%';
        cosmicLove.style.transform = 'translate(-50%, -50%) scale(1.3)';
      }, 350);
      break;
  }
}

// Botón Siguiente
nextBtn.addEventListener('click', () => {
  if (currentStep < 6) {
    currentStep++;
    renderStep(currentStep);
  }
});

// Botón Anterior
prevBtn.addEventListener('click', () => {
  if (isMobileDevice()) {
    return;
  }

  if (currentStep > 1) {
    currentStep--;
    renderStep(currentStep);
  } else {
    // Si estamos en el paso 1, volvemos a cerrar el sobre
    bookContainer.classList.remove('visible', 'night-mode');
    document.body.classList.remove('night-mode');
    envelopeScreen.classList.remove('hidden');

    setTimeout(() => {
      envelope.classList.remove('open');
      flowerWrapper.classList.remove('docked', 'docked-left', 'bloom');
      contentLeft.classList.remove('visible');
    }, 400);
  }
});