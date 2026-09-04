const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const loadingScreen = document.getElementById('loadingScreen');
const musicStartTime = 7.8;

function hideLoadingScreen() {
  if (loadingScreen) loadingScreen.classList.add('hidden');
}

if (bgMusic) {
  if (bgMusic.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    hideLoadingScreen();
  } else {
    bgMusic.addEventListener('canplaythrough', hideLoadingScreen, { once: true });
    bgMusic.addEventListener('error', hideLoadingScreen, { once: true });
    setTimeout(hideLoadingScreen, 10000);
  }
} else {
  hideLoadingScreen();
}

// Función global para iniciar audio desde la interacción con el sobre
function startMusic() {
  if (!bgMusic) return;
  if (bgMusic.currentTime < 0.1) bgMusic.currentTime = musicStartTime;
  bgMusic.play().then(() => {
    if (musicToggle) musicToggle.classList.add('playing');
  }).catch(err => {
    console.log('Esperando interacción directa para reproducir:', err);
  });
}

// Botón flotante para pausar y reanudar
if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });
}