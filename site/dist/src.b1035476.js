parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Hlm9":[function(require,module,exports) {
const t=t=>{if(null===t)return"";if("string"==typeof t)return t;let e="";for(var r in t)e=e+r.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()+":"+t[r]+";";return e};window.React={createElement:function(e,r,n){var o=document.createElement(e);for(let c in r)try{if(c&&r.hasOwnProperty(c)){let e=r[c];!0===e?o.setAttribute(c,c):!1!==e&&null!=e&&("function"==typeof e?o[c.toLowerCase()]=e:"style"===c?o.setAttribute(c,t(e)):o.setAttribute(c,e.toString()))}}catch(l){console.log(l)}for(let t=2;t<arguments.length;t++)try{let e=arguments[t];o.appendChild(null==e.nodeType?document.createTextNode(e.toString()):e)}catch(l){console.log(l)}return o}};
},{}],"VZ5S":[function(require,module,exports) {

},{}],"nR0O":[function(require,module,exports) {
"use strict";var e=i(require("./DesktopApp")),r=i(require("./Login")),u=i(require("./MobileApp"));function i(e){return e&&e.__esModule?e:{default:e}}
},{"./DesktopApp":"VZ5S","./Login":"VZ5S","./MobileApp":"VZ5S"}],"hVsF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e=document.getElementById("root"),t=async(t,o=!1,r=e)=>{if(!o)for(const e of r.children)e.remove();return r.appendChild("function"==typeof t?await t():t),r};var o=t;exports.default=o;
},{}],"c2Qt":[function(require,module,exports) {
"use strict";require("./React");var e=require("./pages"),r=u(require("./render"));function u(e){return e&&e.__esModule?e:{default:e}}(0,r.default)(e.OldHome);
},{"./React":"Hlm9","./pages":"nR0O","./render":"hVsF"}]},{},["c2Qt"], null)
//# sourceMappingURL=/src.b1035476.js.map