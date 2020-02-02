const eventPolyFill = () => {
  if (typeof window.CustomEvent === 'function') return false; // If not IE
  function CustomEvent(event, params0) {
    const evt = document.createEvent('CustomEvent');
    const params = params0 || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return false;
};

eventPolyFill();

const event = new CustomEvent('_COLORPK_SCRIPT_READY');
window.dispatchEvent(event);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('./globalTypeCheck');
}
