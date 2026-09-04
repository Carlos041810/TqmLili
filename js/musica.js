const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Función global para iniciar audio desde la interacción con el sobre
function startMusic() {
  if (!bgMusic) return;
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