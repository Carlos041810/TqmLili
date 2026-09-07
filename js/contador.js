// Fecha de inicio16  de julio de 2026 12:41, hora El Salvador 
const startDate = new Date('2026-07-16T12:41:00-06:00');

function updateCounter() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerEl.innerText = `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
}

setInterval(updateCounter, 1000);
updateCounter();