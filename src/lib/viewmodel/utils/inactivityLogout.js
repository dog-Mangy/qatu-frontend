let timeoutId;
const INACTIVITY_LIMIT = 1 * 60 * 1000; // 15 minutos

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
    timeoutId = setTimeout(() => {
      logoutCallback();
    }, INACTIVITY_LIMIT);
  }

  return () => {
    clearTimeout(timeoutId);
    events.forEach(event =>
      window.removeEventListener(event, resetTimer, true)
    );
  };
}