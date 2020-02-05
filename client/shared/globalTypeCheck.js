const base = {
  staticPath: 'string',
  auth: 'boolean',
  load0: 'number',
};

const pageTypes = {
  '/': {
    likes: 'object',
    initData: 'object',
    removeWelcome: 'function'
  },
  '/new': {
    defaultColors: 'string',
  },
  '/signin': {},
  '/color': {
    likes: 'object',
    selected: 'object',
  },
  '/admin': {
    approve: 'function',
    disapprove: 'function',
    sync: 'function',
  },
  '/profile': {
    list0: 'object',
    list1: 'object',
  },
};

const checkType = (pathname, cpk) => {
  let path = /\/color\/\d+/.test(pathname) ? '/color' : pathname;
  if (['/popular', '/latest'].indexOf(pathname) > -1) {
    path = '/';
  }
  const map0 = Object.assign(pageTypes[path], base);
  Object.keys(cpk).forEach((name) => {
    if (Object.prototype.hasOwnProperty.call(map0, name) &&
      // eslint-disable-next-line valid-typeof
      typeof cpk[name] === map0[name]) {
      delete map0[name];
    } else {
      // eslint-disable-next-line no-console
      console.error(`prop: ${name} is not defined in the check.`);
    }
  });
  const missingProps = Object.keys(map0);
  if (missingProps.length) {
    // eslint-disable-next-line no-console
    console.error('missing props', missingProps);
  }
}

setTimeout(() => {
  checkType(window.location.pathname, window._colorpk);
}, 500);