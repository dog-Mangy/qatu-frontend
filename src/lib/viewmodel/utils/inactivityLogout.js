let timeoutId;
let warningTimeoutId;
let inactividadMostrada = false;
const WARNING_LIMIT = 1 * 60 * 1000; // 1 minutos
const INACTIVITY_LIMIT = 3 * 60 * 1000; // 15 minutos

export function startInactivityWatcher(logoutCallback) {
  resetTimer();

  const events = [
    'mousemove',
    'mousedown',
    'keypress',
    'touchstart',
    'scroll',
    'wheel',
  ];

  events.forEach(event =>
    window.addEventListener(event, resetTimer, true)
  );

  function resetTimer() {
    clearTimeout(timeoutId);
    clearTimeout(warningTimeoutId);
    inactividadMostrada = false;

    warningTimeoutId = setTimeout(() => {
      if (!inactividadMostrada) {
        alert('Ha empezado el conteo de inactividad. Si permaneces inactiv@ por 15 minutos, se cerrará la sesión automáticamente.');
        inactividadMostrada = true;
      }
    }, WARNING_LIMIT);

    timeoutId = setTimeout(() => {
      inactividadMostrada = false;
      logoutCallback();
    }, INACTIVITY_LIMIT);
  }

  return () => {
    clearTimeout(timeoutId);
    clearTimeout(warningTimeoutId);
    events.forEach(event =>
      window.removeEventListener(event, resetTimer, true)
    );
    inactividadMostrada = false;
  };
}