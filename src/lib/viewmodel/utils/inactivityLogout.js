let timeoutId;
let warningTimeoutId;
let inactivityDisplayed = false;
const WARNING_LIMIT = 2 * 60 * 1000;
const INACTIVITY_LIMIT = 15 * 60 * 1000;

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

  events.forEach(event => window.addEventListener(event, resetTimer, true));

  function resetTimer() {
    clearTimeout(timeoutId);
    clearTimeout(warningTimeoutId);
    inactivityDisplayed = false;

    warningTimeoutId = setTimeout(() => {
      if (!inactivityDisplayed) {
        alert(
          'Inactivity timeout has started. If you remain inactive for 15 minutes, you will be automatically logged out.'
        );
        inactivityDisplayed = true;
      }
    }, WARNING_LIMIT);

    timeoutId = setTimeout(() => {
      inactivityDisplayed = false;
      logoutCallback();
    }, INACTIVITY_LIMIT);
  }

  return () => {
    clearTimeout(timeoutId);
    clearTimeout(warningTimeoutId);
    events.forEach(event =>
      window.removeEventListener(event, resetTimer, true)
    );
    inactivityDisplayed = false;
  };
}
