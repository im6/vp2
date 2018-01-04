/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCookieLocal = function getCookieLocal() {
  var result = {};
  if (!window.cookie || window.cookie.length === 0) {
    var cookies0 = document.cookie.split(';');
    result = cookies0.reduce(function (acc, v, k) {
      var idx = v.indexOf('=');
      var v1 = v.split(v[idx]);
      acc[v1[0]] = v1[1];
      return acc;
    }, {});
  } else {
    console.error('invalid cookie');
  }

  return result;
};

var mobileDetect = function mobileDetect() {
  var isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  return isMobile;
};

var localCookie = getCookieLocal();

var ajax = exports.ajax = function ajax(config) {
  var method = config.method,
      url = config.url,
      data = config.data,
      success = config.success,
      fail = config.fail;

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success(xhr.responseText);
      } else {
        fail();
      }
    }
  };

  xhr.open(method, url);
  xhr.setRequestHeader('X-CSRFToken', localCookie.csrftoken);
  if (method !== 'GET') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  xhr.send(JSON.stringify(data));
};

var isMobile = exports.isMobile = mobileDetect();

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

__webpack_require__(19);

var _dragula = __webpack_require__(20);

var _dragula2 = _interopRequireDefault(_dragula);

__webpack_require__(32);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HANDLENAME = 'drgHdl';
var bars = document.getElementsByClassName('jscolor');
var canvas = document.getElementsByClassName('canvas')[0];

var resetColors = function resetColors() {
  for (var i = 0; i < 4; i++) {
    bars[i].jscolor.fromString('ffffff');
  }
};

document.getElementById('createBtn').onclick = function () {
  var state = [].slice.call(bars).map(function (v) {
    return v.jscolor.toString();
  });
  if (state.filter(function (v) {
    return v === 'ffffff';
  }).length > 1) {
    // not valid color here
  } else {
    (0, _util.ajax)({
      method: 'POST',
      url: '/create',
      data: {
        color: state
      },
      success: function success(v) {
        resetColors();
      },
      fail: function fail() {}
    });
  }
};

document.getElementById('resetBtn').onclick = function () {
  resetColors();
};

for (var i = 0; i < 4; i++) {
  bars[i].innerHTML = '<h1 class="' + HANDLENAME + '">&#8801;</h1>';
}

(0, _dragula2.default)([canvas], {
  moves: function moves(el, container, handle) {
    return handle.className === HANDLENAME;
  }
});

setTimeout(function () {
  canvas.style.height = '200px'; // for dragular effect
}, 600);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Cabin);", ""]);

// module
exports.push([module.i, ".btn {\n  height: 30px;\n  padding: 0 12px;\n  border: 1px solid #d9d9d9;\n  background-color: white;\n  cursor: pointer;\n  border-radius: 4px;\n  color: #919191;\n  font-size: 15px;\n  animation-name: btnAnim;\n  animation-fill-mode: backwards;\n  animation-duration: .3s;\n  animation-delay: .42s; }\n\n@keyframes btnAnim {\n  0% {\n    opacity: 0;\n    transform: scale(0); } }\n  .btn:active {\n    background-color: #f7f7f7; }\n  .btn:hover {\n    border: 1px solid #56a5f7;\n    color: #56a5f7; }\n  .btn:focus {\n    outline: 0; }\n\n.btn-primary {\n  border: none;\n  color: white;\n  background-color: #56a5f7; }\n  .btn-primary:hover {\n    color: white;\n    border: none; }\n  .btn-primary:active {\n    background-color: #6099d4; }\n\n@media (max-width: 768px) {\n  .btn {\n    height: auto; } }\n\nheader {\n  position: fixed;\n  z-index: 3;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 41px;\n  background-color: white;\n  box-shadow: 0 5px 10px 0 rgba(0, 64, 128, 0.1); }\n  header > a {\n    float: left;\n    margin: 4px 20px;\n    font-size: 1.6em;\n    color: #63c0d6;\n    letter-spacing: 1.2px;\n    text-decoration: none; }\n\nnav ul, nav li {\n  margin: 0;\n  padding: 0; }\n\nnav ul {\n  list-style: none;\n  width: 100%; }\n\nnav li {\n  float: right;\n  position: relative; }\n  nav li:hover > a {\n    color: #afe3ff; }\n  nav li:hover ul.submenu {\n    opacity: 1;\n    transform: scaleY(1);\n    top: 40px;\n    /* adjust this as per top nav padding top & bottom comes */ }\n\nnav a {\n  color: #63c0d6;\n  display: block;\n  padding: 10px 20px;\n  text-align: center;\n  text-decoration: none; }\n\n.submenu {\n  left: 0;\n  top: -15px;\n  opacity: 0;\n  position: absolute;\n  box-shadow: 0 5px 8px 2px #cccccc;\n  z-index: 2;\n  transform: scaleY(0);\n  transition: transform .28s ease-out, top .28s ease-out; }\n  .submenu li {\n    width: 100%; }\n  .submenu a {\n    background-color: white; }\n    .submenu a:hover {\n      background-color: #63c0d6;\n      color: white; }\n\n@media (max-width: 768px) {\n  header > a {\n    display: none; } }\n\nhtml {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%; }\n  html h1, html h2, html h3, html h4, html h5, html p, html span, html li, html div, html button, html footer, html a {\n    font-family: 'Cabin', sans-serif; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: linear-gradient(to left top, #f0f0f0, #ffffff); }\n\nmain {\n  padding-top: 100px; }\n  main .canvas {\n    width: 180px;\n    margin: auto;\n    padding: 10px;\n    border: 1px solid darkgray;\n    border-radius: 5px;\n    background-color: white;\n    box-shadow: 0 5px 20px 1.5px #cccccc; }\n  main .jscolor {\n    height: 50px;\n    width: 100%;\n    border: 1px dashed darkgray;\n    display: block;\n    animation-name: boxAnim;\n    animation-fill-mode: backwards;\n    animation-duration: .6s;\n    animation-delay: 0.05s; }\n\n@keyframes boxAnim {\n  0% {\n    opacity: 0;\n    height: 0; } }\n    main .jscolor:nth-child(1) {\n      border-radius: 4px 4px 0 0; }\n    main .jscolor:nth-child(4) {\n      border-radius: 0 0 4px 4px; }\n  main .btnGrp {\n    width: 146px;\n    margin: 30px auto; }\n\n.drgHdl {\n  display: block;\n  width: 18px;\n  font-size: 3em;\n  margin: 0;\n  color: white;\n  cursor: move; }\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 *
 * See usage examples at http://jscolor.com/examples/
 */
window.jscolor || (window.jscolor = function () {
  var e = { register: function register() {
      e.attachDOMReadyEvent(e.init), e.attachEvent(document, "mousedown", e.onDocumentMouseDown), e.attachEvent(document, "touchstart", e.onDocumentTouchStart), e.attachEvent(window, "resize", e.onWindowResize);
    }, init: function init() {
      e.jscolor.lookupClass && e.jscolor.installByClassName(e.jscolor.lookupClass);
    }, tryInstallOnElements: function tryInstallOnElements(t, n) {
      var r = new RegExp("(^|\\s)(" + n + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i");for (var i = 0; i < t.length; i += 1) {
        if (t[i].type !== undefined && t[i].type.toLowerCase() == "color" && e.isColorAttrSupported) continue;var s;if (!t[i].jscolor && t[i].className && (s = t[i].className.match(r))) {
          var o = t[i],
              u = null,
              a = e.getDataAttr(o, "jscolor");a !== null ? u = a : s[4] && (u = s[4]);var f = {};if (u) try {
            f = new Function("return (" + u + ")")();
          } catch (l) {
            e.warn("Error parsing jscolor options: " + l + ":\n" + u);
          }o.jscolor = new e.jscolor(o, f);
        }
      }
    }, isColorAttrSupported: function () {
      var e = document.createElement("input");if (e.setAttribute) {
        e.setAttribute("type", "color");if (e.type.toLowerCase() == "color") return !0;
      }return !1;
    }(), isCanvasSupported: function () {
      var e = document.createElement("canvas");return !!e.getContext && !!e.getContext("2d");
    }(), fetchElement: function fetchElement(e) {
      return typeof e == "string" ? document.getElementById(e) : e;
    }, isElementType: function isElementType(e, t) {
      return e.nodeName.toLowerCase() === t.toLowerCase();
    }, getDataAttr: function getDataAttr(e, t) {
      var n = "data-" + t,
          r = e.getAttribute(n);return r !== null ? r : null;
    }, attachEvent: function attachEvent(e, t, n) {
      e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n);
    }, detachEvent: function detachEvent(e, t, n) {
      e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n);
    }, _attachedGroupEvents: {}, attachGroupEvent: function attachGroupEvent(t, n, r, i) {
      e._attachedGroupEvents.hasOwnProperty(t) || (e._attachedGroupEvents[t] = []), e._attachedGroupEvents[t].push([n, r, i]), e.attachEvent(n, r, i);
    }, detachGroupEvents: function detachGroupEvents(t) {
      if (e._attachedGroupEvents.hasOwnProperty(t)) {
        for (var n = 0; n < e._attachedGroupEvents[t].length; n += 1) {
          var r = e._attachedGroupEvents[t][n];e.detachEvent(r[0], r[1], r[2]);
        }delete e._attachedGroupEvents[t];
      }
    }, attachDOMReadyEvent: function attachDOMReadyEvent(e) {
      var t = !1,
          n = function n() {
        t || (t = !0, e());
      };if (document.readyState === "complete") {
        setTimeout(n, 1);return;
      }if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1);else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
          document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), n());
        }), window.attachEvent("onload", n);if (document.documentElement.doScroll && window == window.top) {
          var r = function r() {
            if (!document.body) return;try {
              document.documentElement.doScroll("left"), n();
            } catch (e) {
              setTimeout(r, 1);
            }
          };r();
        }
      }
    }, warn: function warn(e) {
      window.console && window.console.warn && window.console.warn(e);
    }, preventDefault: function preventDefault(e) {
      e.preventDefault && e.preventDefault(), e.returnValue = !1;
    }, captureTarget: function captureTarget(t) {
      t.setCapture && (e._capturedTarget = t, e._capturedTarget.setCapture());
    }, releaseTarget: function releaseTarget() {
      e._capturedTarget && (e._capturedTarget.releaseCapture(), e._capturedTarget = null);
    }, fireEvent: function fireEvent(e, t) {
      if (!e) return;if (document.createEvent) {
        var n = document.createEvent("HTMLEvents");n.initEvent(t, !0, !0), e.dispatchEvent(n);
      } else if (document.createEventObject) {
        var n = document.createEventObject();e.fireEvent("on" + t, n);
      } else e["on" + t] && e["on" + t]();
    }, classNameToList: function classNameToList(e) {
      return e.replace(/^\s+|\s+$/g, "").split(/\s+/);
    }, hasClass: function hasClass(e, t) {
      return t ? -1 != (" " + e.className.replace(/\s+/g, " ") + " ").indexOf(" " + t + " ") : !1;
    }, setClass: function setClass(t, n) {
      var r = e.classNameToList(n);for (var i = 0; i < r.length; i += 1) {
        e.hasClass(t, r[i]) || (t.className += (t.className ? " " : "") + r[i]);
      }
    }, unsetClass: function unsetClass(t, n) {
      var r = e.classNameToList(n);for (var i = 0; i < r.length; i += 1) {
        var s = new RegExp("^\\s*" + r[i] + "\\s*|" + "\\s*" + r[i] + "\\s*$|" + "\\s+" + r[i] + "(\\s+)", "g");t.className = t.className.replace(s, "$1");
      }
    }, getStyle: function getStyle(e) {
      return window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    }, setStyle: function () {
      var e = document.createElement("div"),
          t = function t(_t) {
        for (var n = 0; n < _t.length; n += 1) {
          if (_t[n] in e.style) return _t[n];
        }
      },
          n = { borderRadius: t(["borderRadius", "MozBorderRadius", "webkitBorderRadius"]), boxShadow: t(["boxShadow", "MozBoxShadow", "webkitBoxShadow"]) };return function (e, t, r) {
        switch (t.toLowerCase()) {case "opacity":
            var i = Math.round(parseFloat(r) * 100);e.style.opacity = r, e.style.filter = "alpha(opacity=" + i + ")";break;default:
            e.style[n[t]] = r;}
      };
    }(), setBorderRadius: function setBorderRadius(t, n) {
      e.setStyle(t, "borderRadius", n || "0");
    }, setBoxShadow: function setBoxShadow(t, n) {
      e.setStyle(t, "boxShadow", n || "none");
    }, getElementPos: function getElementPos(t, n) {
      var r = 0,
          i = 0,
          s = t.getBoundingClientRect();r = s.left, i = s.top;if (!n) {
        var o = e.getViewPos();r += o[0], i += o[1];
      }return [r, i];
    }, getElementSize: function getElementSize(e) {
      return [e.offsetWidth, e.offsetHeight];
    }, getAbsPointerPos: function getAbsPointerPos(e) {
      e || (e = window.event);var t = 0,
          n = 0;return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (t = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (t = e.clientX, n = e.clientY), { x: t, y: n };
    }, getRelPointerPos: function getRelPointerPos(e) {
      e || (e = window.event);var t = e.target || e.srcElement,
          n = t.getBoundingClientRect(),
          r = 0,
          i = 0,
          s = 0,
          o = 0;return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (s = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (s = e.clientX, o = e.clientY), r = s - n.left, i = o - n.top, { x: r, y: i };
    }, getViewPos: function getViewPos() {
      var e = document.documentElement;return [(window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0), (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)];
    }, getViewSize: function getViewSize() {
      var e = document.documentElement;return [window.innerWidth || e.clientWidth, window.innerHeight || e.clientHeight];
    }, redrawPosition: function redrawPosition() {
      if (e.picker && e.picker.owner) {
        var t = e.picker.owner,
            n,
            r;t.fixed ? (n = e.getElementPos(t.targetElement, !0), r = [0, 0]) : (n = e.getElementPos(t.targetElement), r = e.getViewPos());var i = e.getElementSize(t.targetElement),
            s = e.getViewSize(),
            o = e.getPickerOuterDims(t),
            u,
            a,
            f;switch (t.position.toLowerCase()) {case "left":
            u = 1, a = 0, f = -1;break;case "right":
            u = 1, a = 0, f = 1;break;case "top":
            u = 0, a = 1, f = -1;break;default:
            u = 0, a = 1, f = 1;}var l = (i[a] + o[a]) / 2;if (!t.smartPosition) var c = [n[u], n[a] + i[a] - l + l * f];else var c = [-r[u] + n[u] + o[u] > s[u] ? -r[u] + n[u] + i[u] / 2 > s[u] / 2 && n[u] + i[u] - o[u] >= 0 ? n[u] + i[u] - o[u] : n[u] : n[u], -r[a] + n[a] + i[a] + o[a] - l + l * f > s[a] ? -r[a] + n[a] + i[a] / 2 > s[a] / 2 && n[a] + i[a] - l - l * f >= 0 ? n[a] + i[a] - l - l * f : n[a] + i[a] - l + l * f : n[a] + i[a] - l + l * f >= 0 ? n[a] + i[a] - l + l * f : n[a] + i[a] - l - l * f];var h = c[u],
            p = c[a],
            d = t.fixed ? "fixed" : "absolute",
            v = (c[0] + o[0] > n[0] || c[0] < n[0] + i[0]) && c[1] + o[1] < n[1] + i[1];e._drawPosition(t, h, p, d, v);
      }
    }, _drawPosition: function _drawPosition(t, n, r, i, s) {
      var o = s ? 0 : t.shadowBlur;e.picker.wrap.style.position = i, e.picker.wrap.style.left = n + "px", e.picker.wrap.style.top = r + "px", e.setBoxShadow(e.picker.boxS, t.shadow ? new e.BoxShadow(0, o, t.shadowBlur, 0, t.shadowColor) : null);
    }, getPickerDims: function getPickerDims(t) {
      var n = !!e.getSliderComponent(t),
          r = [2 * t.insetWidth + 2 * t.padding + t.width + (n ? 2 * t.insetWidth + e.getPadToSliderPadding(t) + t.sliderSize : 0), 2 * t.insetWidth + 2 * t.padding + t.height + (t.closable ? 2 * t.insetWidth + t.padding + t.buttonHeight : 0)];return r;
    }, getPickerOuterDims: function getPickerOuterDims(t) {
      var n = e.getPickerDims(t);return [n[0] + 2 * t.borderWidth, n[1] + 2 * t.borderWidth];
    }, getPadToSliderPadding: function getPadToSliderPadding(e) {
      return Math.max(e.padding, 1.5 * (2 * e.pointerBorderWidth + e.pointerThickness));
    }, getPadYComponent: function getPadYComponent(e) {
      switch (e.mode.charAt(1).toLowerCase()) {case "v":
          return "v";}return "s";
    }, getSliderComponent: function getSliderComponent(e) {
      if (e.mode.length > 2) switch (e.mode.charAt(2).toLowerCase()) {case "s":
          return "s";case "v":
          return "v";}return null;
    }, onDocumentMouseDown: function onDocumentMouseDown(t) {
      t || (t = window.event);var n = t.target || t.srcElement;n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "mouse") : e.picker && e.picker.owner && e.picker.owner.hide();
    }, onDocumentTouchStart: function onDocumentTouchStart(t) {
      t || (t = window.event);var n = t.target || t.srcElement;n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "touch") : e.picker && e.picker.owner && e.picker.owner.hide();
    }, onWindowResize: function onWindowResize(t) {
      e.redrawPosition();
    }, onParentScroll: function onParentScroll(t) {
      e.picker && e.picker.owner && e.picker.owner.hide();
    }, _pointerMoveEvent: { mouse: "mousemove", touch: "touchmove" }, _pointerEndEvent: { mouse: "mouseup", touch: "touchend" }, _pointerOrigin: null, _capturedTarget: null, onControlPointerStart: function onControlPointerStart(t, n, r, i) {
      var s = n._jscInstance;e.preventDefault(t), e.captureTarget(n);var o = function o(s, _o) {
        e.attachGroupEvent("drag", s, e._pointerMoveEvent[i], e.onDocumentPointerMove(t, n, r, i, _o)), e.attachGroupEvent("drag", s, e._pointerEndEvent[i], e.onDocumentPointerEnd(t, n, r, i));
      };o(document, [0, 0]);if (window.parent && window.frameElement) {
        var u = window.frameElement.getBoundingClientRect(),
            a = [-u.left, -u.top];o(window.parent.window.document, a);
      }var f = e.getAbsPointerPos(t),
          l = e.getRelPointerPos(t);e._pointerOrigin = { x: f.x - l.x, y: f.y - l.y };switch (r) {case "pad":
          switch (e.getSliderComponent(s)) {case "s":
              s.hsv[1] === 0 && s.fromHSV(null, 100, null);break;case "v":
              s.hsv[2] === 0 && s.fromHSV(null, null, 100);}e.setPad(s, t, 0, 0);break;case "sld":
          e.setSld(s, t, 0);}e.dispatchFineChange(s);
    }, onDocumentPointerMove: function onDocumentPointerMove(t, n, r, i, s) {
      return function (t) {
        var i = n._jscInstance;switch (r) {case "pad":
            t || (t = window.event), e.setPad(i, t, s[0], s[1]), e.dispatchFineChange(i);break;case "sld":
            t || (t = window.event), e.setSld(i, t, s[1]), e.dispatchFineChange(i);}
      };
    }, onDocumentPointerEnd: function onDocumentPointerEnd(t, n, r, i) {
      return function (t) {
        var r = n._jscInstance;e.detachGroupEvents("drag"), e.releaseTarget(), e.dispatchChange(r);
      };
    }, dispatchChange: function dispatchChange(t) {
      t.valueElement && e.isElementType(t.valueElement, "input") && e.fireEvent(t.valueElement, "change");
    }, dispatchFineChange: function dispatchFineChange(e) {
      if (e.onFineChange) {
        var t;typeof e.onFineChange == "string" ? t = new Function(e.onFineChange) : t = e.onFineChange, t.call(e);
      }
    }, setPad: function setPad(t, n, r, i) {
      var s = e.getAbsPointerPos(n),
          o = r + s.x - e._pointerOrigin.x - t.padding - t.insetWidth,
          u = i + s.y - e._pointerOrigin.y - t.padding - t.insetWidth,
          a = o * (360 / (t.width - 1)),
          f = 100 - u * (100 / (t.height - 1));switch (e.getPadYComponent(t)) {case "s":
          t.fromHSV(a, f, null, e.leaveSld);break;case "v":
          t.fromHSV(a, null, f, e.leaveSld);}
    }, setSld: function setSld(t, n, r) {
      var i = e.getAbsPointerPos(n),
          s = r + i.y - e._pointerOrigin.y - t.padding - t.insetWidth,
          o = 100 - s * (100 / (t.height - 1));switch (e.getSliderComponent(t)) {case "s":
          t.fromHSV(null, o, null, e.leavePad);break;case "v":
          t.fromHSV(null, null, o, e.leavePad);}
    }, _vmlNS: "jsc_vml_", _vmlCSS: "jsc_vml_css_", _vmlReady: !1, initVML: function initVML() {
      if (!e._vmlReady) {
        var t = document;t.namespaces[e._vmlNS] || t.namespaces.add(e._vmlNS, "urn:schemas-microsoft-com:vml");if (!t.styleSheets[e._vmlCSS]) {
          var n = ["shape", "shapetype", "group", "background", "path", "formulas", "handles", "fill", "stroke", "shadow", "textbox", "textpath", "imagedata", "line", "polyline", "curve", "rect", "roundrect", "oval", "arc", "image"],
              r = t.createStyleSheet();r.owningElement.id = e._vmlCSS;for (var i = 0; i < n.length; i += 1) {
            r.addRule(e._vmlNS + "\\:" + n[i], "behavior:url(#default#VML);");
          }
        }e._vmlReady = !0;
      }
    }, createPalette: function createPalette() {
      var t = { elm: null, draw: null };if (e.isCanvasSupported) {
        var n = document.createElement("canvas"),
            r = n.getContext("2d"),
            i = function i(e, t, _i) {
          n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);var s = r.createLinearGradient(0, 0, n.width, 0);s.addColorStop(0, "#F00"), s.addColorStop(1 / 6, "#FF0"), s.addColorStop(2 / 6, "#0F0"), s.addColorStop(.5, "#0FF"), s.addColorStop(4 / 6, "#00F"), s.addColorStop(5 / 6, "#F0F"), s.addColorStop(1, "#F00"), r.fillStyle = s, r.fillRect(0, 0, n.width, n.height);var o = r.createLinearGradient(0, 0, 0, n.height);switch (_i.toLowerCase()) {case "s":
              o.addColorStop(0, "rgba(255,255,255,0)"), o.addColorStop(1, "rgba(255,255,255,1)");break;case "v":
              o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(1, "rgba(0,0,0,1)");}r.fillStyle = o, r.fillRect(0, 0, n.width, n.height);
        };t.elm = n, t.draw = i;
      } else {
        e.initVML();var s = document.createElement("div");s.style.position = "relative", s.style.overflow = "hidden";var o = document.createElement(e._vmlNS + ":fill");o.type = "gradient", o.method = "linear", o.angle = "90", o.colors = "16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";var u = document.createElement(e._vmlNS + ":rect");u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);var a = document.createElement(e._vmlNS + ":fill");a.type = "gradient", a.method = "linear", a.angle = "180", a.opacity = "0";var f = document.createElement(e._vmlNS + ":rect");f.style.position = "absolute", f.style.left = "-1px", f.style.top = "-1px", f.stroked = !1, f.appendChild(a), s.appendChild(f);var i = function i(e, t, n) {
          s.style.width = e + "px", s.style.height = t + "px", u.style.width = f.style.width = e + 1 + "px", u.style.height = f.style.height = t + 1 + "px", o.color = "#F00", o.color2 = "#F00";switch (n.toLowerCase()) {case "s":
              a.color = a.color2 = "#FFF";break;case "v":
              a.color = a.color2 = "#000";}
        };t.elm = s, t.draw = i;
      }return t;
    }, createSliderGradient: function createSliderGradient() {
      var t = { elm: null, draw: null };if (e.isCanvasSupported) {
        var n = document.createElement("canvas"),
            r = n.getContext("2d"),
            i = function i(e, t, _i2, s) {
          n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);var o = r.createLinearGradient(0, 0, 0, n.height);o.addColorStop(0, _i2), o.addColorStop(1, s), r.fillStyle = o, r.fillRect(0, 0, n.width, n.height);
        };t.elm = n, t.draw = i;
      } else {
        e.initVML();var s = document.createElement("div");s.style.position = "relative", s.style.overflow = "hidden";var o = document.createElement(e._vmlNS + ":fill");o.type = "gradient", o.method = "linear", o.angle = "180";var u = document.createElement(e._vmlNS + ":rect");u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);var i = function i(e, t, n, r) {
          s.style.width = e + "px", s.style.height = t + "px", u.style.width = e + 1 + "px", u.style.height = t + 1 + "px", o.color = n, o.color2 = r;
        };t.elm = s, t.draw = i;
      }return t;
    }, leaveValue: 1, leaveStyle: 2, leavePad: 4, leaveSld: 8, BoxShadow: function () {
      var e = function e(_e, t, n, r, i, s) {
        this.hShadow = _e, this.vShadow = t, this.blur = n, this.spread = r, this.color = i, this.inset = !!s;
      };return e.prototype.toString = function () {
        var e = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color];return this.inset && e.push("inset"), e.join(" ");
      }, e;
    }(), jscolor: function jscolor(t, n) {
      function i(e, t, n) {
        e /= 255, t /= 255, n /= 255;var r = Math.min(Math.min(e, t), n),
            i = Math.max(Math.max(e, t), n),
            s = i - r;if (s === 0) return [null, 0, 100 * i];var o = e === r ? 3 + (n - t) / s : t === r ? 5 + (e - n) / s : 1 + (t - e) / s;return [60 * (o === 6 ? 0 : o), 100 * (s / i), 100 * i];
      }function s(e, t, n) {
        var r = 255 * (n / 100);if (e === null) return [r, r, r];e /= 60, t /= 100;var i = Math.floor(e),
            s = i % 2 ? e - i : 1 - (e - i),
            o = r * (1 - t),
            u = r * (1 - t * s);switch (i) {case 6:case 0:
            return [r, u, o];case 1:
            return [u, r, o];case 2:
            return [o, r, u];case 3:
            return [o, u, r];case 4:
            return [u, o, r];case 5:
            return [r, o, u];}
      }function o() {
        e.unsetClass(d.targetElement, d.activeClass), e.picker.wrap.parentNode.removeChild(e.picker.wrap), delete e.picker.owner;
      }function u() {
        function l() {
          var e = d.insetColor.split(/\s+/),
              n = e.length < 2 ? e[0] : e[1] + " " + e[0] + " " + e[0] + " " + e[1];t.btn.style.borderColor = n;
        }d._processParentElementsInDOM(), e.picker || (e.picker = { owner: null, wrap: document.createElement("div"), box: document.createElement("div"), boxS: document.createElement("div"), boxB: document.createElement("div"), pad: document.createElement("div"), padB: document.createElement("div"), padM: document.createElement("div"), padPal: e.createPalette(), cross: document.createElement("div"), crossBY: document.createElement("div"), crossBX: document.createElement("div"), crossLY: document.createElement("div"), crossLX: document.createElement("div"), sld: document.createElement("div"), sldB: document.createElement("div"), sldM: document.createElement("div"), sldGrad: e.createSliderGradient(), sldPtrS: document.createElement("div"), sldPtrIB: document.createElement("div"), sldPtrMB: document.createElement("div"), sldPtrOB: document.createElement("div"), btn: document.createElement("div"), btnT: document.createElement("span") }, e.picker.pad.appendChild(e.picker.padPal.elm), e.picker.padB.appendChild(e.picker.pad), e.picker.cross.appendChild(e.picker.crossBY), e.picker.cross.appendChild(e.picker.crossBX), e.picker.cross.appendChild(e.picker.crossLY), e.picker.cross.appendChild(e.picker.crossLX), e.picker.padB.appendChild(e.picker.cross), e.picker.box.appendChild(e.picker.padB), e.picker.box.appendChild(e.picker.padM), e.picker.sld.appendChild(e.picker.sldGrad.elm), e.picker.sldB.appendChild(e.picker.sld), e.picker.sldB.appendChild(e.picker.sldPtrOB), e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB), e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB), e.picker.sldPtrIB.appendChild(e.picker.sldPtrS), e.picker.box.appendChild(e.picker.sldB), e.picker.box.appendChild(e.picker.sldM), e.picker.btn.appendChild(e.picker.btnT), e.picker.box.appendChild(e.picker.btn), e.picker.boxB.appendChild(e.picker.box), e.picker.wrap.appendChild(e.picker.boxS), e.picker.wrap.appendChild(e.picker.boxB));var t = e.picker,
            n = !!e.getSliderComponent(d),
            r = e.getPickerDims(d),
            i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
            s = e.getPadToSliderPadding(d),
            o = Math.min(d.borderRadius, Math.round(d.padding * Math.PI)),
            u = "crosshair";t.wrap.style.clear = "both", t.wrap.style.width = r[0] + 2 * d.borderWidth + "px", t.wrap.style.height = r[1] + 2 * d.borderWidth + "px", t.wrap.style.zIndex = d.zIndex, t.box.style.width = r[0] + "px", t.box.style.height = r[1] + "px", t.boxS.style.position = "absolute", t.boxS.style.left = "0", t.boxS.style.top = "0", t.boxS.style.width = "100%", t.boxS.style.height = "100%", e.setBorderRadius(t.boxS, o + "px"), t.boxB.style.position = "relative", t.boxB.style.border = d.borderWidth + "px solid", t.boxB.style.borderColor = d.borderColor, t.boxB.style.background = d.backgroundColor, e.setBorderRadius(t.boxB, o + "px"), t.padM.style.background = t.sldM.style.background = "#FFF", e.setStyle(t.padM, "opacity", "0"), e.setStyle(t.sldM, "opacity", "0"), t.pad.style.position = "relative", t.pad.style.width = d.width + "px", t.pad.style.height = d.height + "px", t.padPal.draw(d.width, d.height, e.getPadYComponent(d)), t.padB.style.position = "absolute", t.padB.style.left = d.padding + "px", t.padB.style.top = d.padding + "px", t.padB.style.border = d.insetWidth + "px solid", t.padB.style.borderColor = d.insetColor, t.padM._jscInstance = d, t.padM._jscControlName = "pad", t.padM.style.position = "absolute", t.padM.style.left = "0", t.padM.style.top = "0", t.padM.style.width = d.padding + 2 * d.insetWidth + d.width + s / 2 + "px", t.padM.style.height = r[1] + "px", t.padM.style.cursor = u, t.cross.style.position = "absolute", t.cross.style.left = t.cross.style.top = "0", t.cross.style.width = t.cross.style.height = i + "px", t.crossBY.style.position = t.crossBX.style.position = "absolute", t.crossBY.style.background = t.crossBX.style.background = d.pointerBorderColor, t.crossBY.style.width = t.crossBX.style.height = 2 * d.pointerBorderWidth + d.pointerThickness + "px", t.crossBY.style.height = t.crossBX.style.width = i + "px", t.crossBY.style.left = t.crossBX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) - d.pointerBorderWidth + "px", t.crossBY.style.top = t.crossBX.style.left = "0", t.crossLY.style.position = t.crossLX.style.position = "absolute", t.crossLY.style.background = t.crossLX.style.background = d.pointerColor, t.crossLY.style.height = t.crossLX.style.width = i - 2 * d.pointerBorderWidth + "px", t.crossLY.style.width = t.crossLX.style.height = d.pointerThickness + "px", t.crossLY.style.left = t.crossLX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) + "px", t.crossLY.style.top = t.crossLX.style.left = d.pointerBorderWidth + "px", t.sld.style.overflow = "hidden", t.sld.style.width = d.sliderSize + "px", t.sld.style.height = d.height + "px", t.sldGrad.draw(d.sliderSize, d.height, "#000", "#000"), t.sldB.style.display = n ? "block" : "none", t.sldB.style.position = "absolute", t.sldB.style.right = d.padding + "px", t.sldB.style.top = d.padding + "px", t.sldB.style.border = d.insetWidth + "px solid", t.sldB.style.borderColor = d.insetColor, t.sldM._jscInstance = d, t.sldM._jscControlName = "sld", t.sldM.style.display = n ? "block" : "none", t.sldM.style.position = "absolute", t.sldM.style.right = "0", t.sldM.style.top = "0", t.sldM.style.width = d.sliderSize + s / 2 + d.padding + 2 * d.insetWidth + "px", t.sldM.style.height = r[1] + "px", t.sldM.style.cursor = "default", t.sldPtrIB.style.border = t.sldPtrOB.style.border = d.pointerBorderWidth + "px solid " + d.pointerBorderColor, t.sldPtrOB.style.position = "absolute", t.sldPtrOB.style.left = -(2 * d.pointerBorderWidth + d.pointerThickness) + "px", t.sldPtrOB.style.top = "0", t.sldPtrMB.style.border = d.pointerThickness + "px solid " + d.pointerColor, t.sldPtrS.style.width = d.sliderSize + "px", t.sldPtrS.style.height = m + "px", t.btn.style.display = d.closable ? "block" : "none", t.btn.style.position = "absolute", t.btn.style.left = d.padding + "px", t.btn.style.bottom = d.padding + "px", t.btn.style.padding = "0 15px", t.btn.style.height = d.buttonHeight + "px", t.btn.style.border = d.insetWidth + "px solid", l(), t.btn.style.color = d.buttonColor, t.btn.style.font = "12px sans-serif", t.btn.style.textAlign = "center";try {
          t.btn.style.cursor = "pointer";
        } catch (c) {
          t.btn.style.cursor = "hand";
        }t.btn.onmousedown = function () {
          d.hide();
        }, t.btnT.style.lineHeight = d.buttonHeight + "px", t.btnT.innerHTML = "", t.btnT.appendChild(document.createTextNode(d.closeText)), a(), f(), e.picker.owner && e.picker.owner !== d && e.unsetClass(e.picker.owner.targetElement, d.activeClass), e.picker.owner = d, e.isElementType(v, "body") ? e.redrawPosition() : e._drawPosition(d, 0, 0, "relative", !1), t.wrap.parentNode != v && v.appendChild(t.wrap), e.setClass(d.targetElement, d.activeClass);
      }function a() {
        switch (e.getPadYComponent(d)) {case "s":
            var t = 1;break;case "v":
            var t = 2;}var n = Math.round(d.hsv[0] / 360 * (d.width - 1)),
            r = Math.round((1 - d.hsv[t] / 100) * (d.height - 1)),
            i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
            o = -Math.floor(i / 2);e.picker.cross.style.left = n + o + "px", e.picker.cross.style.top = r + o + "px";switch (e.getSliderComponent(d)) {case "s":
            var u = s(d.hsv[0], 100, d.hsv[2]),
                a = s(d.hsv[0], 0, d.hsv[2]),
                f = "rgb(" + Math.round(u[0]) + "," + Math.round(u[1]) + "," + Math.round(u[2]) + ")",
                l = "rgb(" + Math.round(a[0]) + "," + Math.round(a[1]) + "," + Math.round(a[2]) + ")";e.picker.sldGrad.draw(d.sliderSize, d.height, f, l);break;case "v":
            var c = s(d.hsv[0], d.hsv[1], 100),
                f = "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")",
                l = "#000";e.picker.sldGrad.draw(d.sliderSize, d.height, f, l);}
      }function f() {
        var t = e.getSliderComponent(d);if (t) {
          switch (t) {case "s":
              var n = 1;break;case "v":
              var n = 2;}var r = Math.round((1 - d.hsv[n] / 100) * (d.height - 1));e.picker.sldPtrOB.style.top = r - (2 * d.pointerBorderWidth + d.pointerThickness) - Math.floor(m / 2) + "px";
        }
      }function l() {
        return e.picker && e.picker.owner === d;
      }function c() {
        d.importColor();
      }this.value = null, this.valueElement = t, this.styleElement = t, this.required = !0, this.refine = !0, this.hash = !1, this.uppercase = !0, this.onFineChange = null, this.activeClass = "jscolor-active", this.minS = 0, this.maxS = 100, this.minV = 0, this.maxV = 100, this.hsv = [0, 0, 100], this.rgb = [255, 255, 255], this.width = 181, this.height = 101, this.showOnClick = !0, this.mode = "HSV", this.position = "bottom", this.smartPosition = !0, this.sliderSize = 16, this.crossSize = 8, this.closable = !1, this.closeText = "Close", this.buttonColor = "#000000", this.buttonHeight = 18, this.padding = 12, this.backgroundColor = "#FFFFFF", this.borderWidth = 1, this.borderColor = "#BBBBBB", this.borderRadius = 8, this.insetWidth = 1, this.insetColor = "#BBBBBB", this.shadow = !0, this.shadowBlur = 15, this.shadowColor = "rgba(0,0,0,0.2)", this.pointerColor = "#4C4C4C", this.pointerBorderColor = "#FFFFFF", this.pointerBorderWidth = 1, this.pointerThickness = 2, this.zIndex = 1e3, this.container = null;for (var r in n) {
        n.hasOwnProperty(r) && (this[r] = n[r]);
      }this.hide = function () {
        l() && o();
      }, this.show = function () {
        u();
      }, this.redraw = function () {
        l() && u();
      }, this.importColor = function () {
        this.valueElement ? e.isElementType(this.valueElement, "input") ? this.refine ? !this.required && /^\s*$/.test(this.valueElement.value) ? (this.valueElement.value = "", this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.fromString(this.valueElement.value) || this.exportColor() : this.fromString(this.valueElement.value, e.leaveValue) || (this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.exportColor() : this.exportColor();
      }, this.exportColor = function (t) {
        if (!(t & e.leaveValue) && this.valueElement) {
          var n = this.toString();this.uppercase && (n = n.toUpperCase()), this.hash && (n = "#" + n), e.isElementType(this.valueElement, "input") ? this.valueElement.value = n : this.valueElement.innerHTML = n;
        }t & e.leaveStyle || this.styleElement && (this.styleElement.style.backgroundImage = "none", this.styleElement.style.backgroundColor = "#" + this.toString(), this.styleElement.style.color = this.isLight() ? "#000" : "#FFF"), !(t & e.leavePad) && l() && a(), !(t & e.leaveSld) && l() && f();
      }, this.fromHSV = function (e, t, n, r) {
        if (e !== null) {
          if (isNaN(e)) return !1;e = Math.max(0, Math.min(360, e));
        }if (t !== null) {
          if (isNaN(t)) return !1;t = Math.max(0, Math.min(100, this.maxS, t), this.minS);
        }if (n !== null) {
          if (isNaN(n)) return !1;n = Math.max(0, Math.min(100, this.maxV, n), this.minV);
        }this.rgb = s(e === null ? this.hsv[0] : this.hsv[0] = e, t === null ? this.hsv[1] : this.hsv[1] = t, n === null ? this.hsv[2] : this.hsv[2] = n), this.exportColor(r);
      }, this.fromRGB = function (e, t, n, r) {
        if (e !== null) {
          if (isNaN(e)) return !1;e = Math.max(0, Math.min(255, e));
        }if (t !== null) {
          if (isNaN(t)) return !1;t = Math.max(0, Math.min(255, t));
        }if (n !== null) {
          if (isNaN(n)) return !1;n = Math.max(0, Math.min(255, n));
        }var o = i(e === null ? this.rgb[0] : e, t === null ? this.rgb[1] : t, n === null ? this.rgb[2] : n);o[0] !== null && (this.hsv[0] = Math.max(0, Math.min(360, o[0]))), o[2] !== 0 && (this.hsv[1] = o[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, o[1]))), this.hsv[2] = o[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, o[2]));var u = s(this.hsv[0], this.hsv[1], this.hsv[2]);this.rgb[0] = u[0], this.rgb[1] = u[1], this.rgb[2] = u[2], this.exportColor(r);
      }, this.fromString = function (e, t) {
        var n;if (n = e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) return n[1].length === 6 ? this.fromRGB(parseInt(n[1].substr(0, 2), 16), parseInt(n[1].substr(2, 2), 16), parseInt(n[1].substr(4, 2), 16), t) : this.fromRGB(parseInt(n[1].charAt(0) + n[1].charAt(0), 16), parseInt(n[1].charAt(1) + n[1].charAt(1), 16), parseInt(n[1].charAt(2) + n[1].charAt(2), 16), t), !0;if (n = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
          var r = n[1].split(","),
              i = /^\s*(\d*)(\.\d+)?\s*$/,
              s,
              o,
              u;if (r.length >= 3 && (s = r[0].match(i)) && (o = r[1].match(i)) && (u = r[2].match(i))) {
            var a = parseFloat((s[1] || "0") + (s[2] || "")),
                f = parseFloat((o[1] || "0") + (o[2] || "")),
                l = parseFloat((u[1] || "0") + (u[2] || ""));return this.fromRGB(a, f, l, t), !0;
          }
        }return !1;
      }, this.toString = function () {
        return (256 | Math.round(this.rgb[0])).toString(16).substr(1) + (256 | Math.round(this.rgb[1])).toString(16).substr(1) + (256 | Math.round(this.rgb[2])).toString(16).substr(1);
      }, this.toHEXString = function () {
        return "#" + this.toString().toUpperCase();
      }, this.toRGBString = function () {
        return "rgb(" + Math.round(this.rgb[0]) + "," + Math.round(this.rgb[1]) + "," + Math.round(this.rgb[2]) + ")";
      }, this.isLight = function () {
        return .213 * this.rgb[0] + .715 * this.rgb[1] + .072 * this.rgb[2] > 127.5;
      }, this._processParentElementsInDOM = function () {
        if (this._linkedElementsProcessed) return;this._linkedElementsProcessed = !0;var t = this.targetElement;do {
          var n = e.getStyle(t);n && n.position.toLowerCase() === "fixed" && (this.fixed = !0), t !== this.targetElement && (t._jscEventsAttached || (e.attachEvent(t, "scroll", e.onParentScroll), t._jscEventsAttached = !0));
        } while ((t = t.parentNode) && !e.isElementType(t, "body"));
      };if (typeof t == "string") {
        var h = t,
            p = document.getElementById(h);p ? this.targetElement = p : e.warn("Could not find target element with ID '" + h + "'");
      } else t ? this.targetElement = t : e.warn("Invalid target element: '" + t + "'");if (this.targetElement._jscLinkedInstance) {
        e.warn("Cannot link jscolor twice to the same element. Skipping.");return;
      }this.targetElement._jscLinkedInstance = this, this.valueElement = e.fetchElement(this.valueElement), this.styleElement = e.fetchElement(this.styleElement);var d = this,
          v = this.container ? e.fetchElement(this.container) : document.getElementsByTagName("body")[0],
          m = 3;if (e.isElementType(this.targetElement, "button")) if (this.targetElement.onclick) {
        var g = this.targetElement.onclick;this.targetElement.onclick = function (e) {
          return g.call(this, e), !1;
        };
      } else this.targetElement.onclick = function () {
        return !1;
      };if (this.valueElement && e.isElementType(this.valueElement, "input")) {
        var y = function y() {
          d.fromString(d.valueElement.value, e.leaveValue), e.dispatchFineChange(d);
        };e.attachEvent(this.valueElement, "keyup", y), e.attachEvent(this.valueElement, "input", y), e.attachEvent(this.valueElement, "blur", c), this.valueElement.setAttribute("autocomplete", "off");
      }this.styleElement && (this.styleElement._jscOrigStyle = { backgroundImage: this.styleElement.style.backgroundImage, backgroundColor: this.styleElement.style.backgroundColor, color: this.styleElement.style.color }), this.value ? this.fromString(this.value) || this.exportColor() : this.importColor();
    } };return e.jscolor.lookupClass = "jscolor", e.jscolor.installByClassName = function (t) {
    var n = document.getElementsByTagName("input"),
        r = document.getElementsByTagName("button");e.tryInstallOnElements(n, t), e.tryInstallOnElements(r, t);
  }, e.register(), e.jscolor;
}());

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__(21);
var crossvent = __webpack_require__(28);
var classes = __webpack_require__(31);
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__(22);
var debounce = __webpack_require__(23);

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__(24);

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25).setImmediate))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(26);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(27)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__(29);
var eventmap = __webpack_require__(30);
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./dragula.min.css", function() {
			var newContent = require("!!../../css-loader/index.js!./dragula.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";filter:alpha(opacity=20)}", ""]);

// exports


/***/ })
/******/ ]);