import './style.scss';
typeof ga === 'function' && ga('send', 'timing', {
  'timingCategory': 'script_loading',
  'timingVar': 'signin',
  'timingValue': Date.now() - window._colorpk.load0
});
