(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i(n.key),n)}}function n(e,t,r){return(t=i(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!==e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}const o=function(){function e(t){var r=t.role,i=t.iframe,o=t.origin,a=t.topEmit;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"_packs",{}),n(this,"iframe",[]),this.role=r,this.origin=null!=o?o:window.location.origin,this.topEmit=null!=a&&a,"parent"===r&&this.addIframe(i)}var i,o,a;return i=e,o=[{key:"_send",value:function(e,t,r){r.contentWindow.postMessage({type:e,args:t},this.origin)}},{key:"_createProcessMessageHandler",value:function(e,r){return function(n){var i,o=n.data;return o.type===e&&r.apply(void 0,function(e){if(Array.isArray(e))return t(e)}(i=o.args)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(i)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}}},{key:"addIframe",value:function(t){var r;if(e.isIframe(t)&&(r=[t]),r&&r instanceof Array)for(var n=0;n<r.length;n++){var i=r[n];e.isIframe(i)&&this.iframe&&-1===this.iframe.indexOf(i)&&this.iframe.push(i)}}},{key:"on",value:function(e,t){if(e&&t&&t instanceof Function){var r=this._createProcessMessageHandler(e,t);window.addEventListener("message",r);var n=function(){return window.removeEventListener("message",r)},i={type:e,handler:r,removeHandler:n};return this._packs[e]?this._packs[e].push(i):this._packs[e]=[i],n}}},{key:"off",value:function(e){this._packs[e]&&this._packs[e].forEach((function(e){return e.removeHandler()}))}},{key:"emit",value:function(){var t=this;if(arguments.length){var r=Array.prototype.slice.call(arguments),n=r.shift();if("parent"===this.role)this.iframe&&this.iframe instanceof Array&&this.iframe.forEach((function(i,o){e.isIframe(i)&&(i.contentWindow&&i.contentWindow.postMessage?t._send(n,r,i):t.iframe.splice(o,1))}));else if("children"===this.role){var i=this.topEmit?"top":"parent",o=window[i];o&&o.postMessage({type:n,args:r},this.origin)}}}}],a=[{key:"isIframe",value:function(e){return e&&"IFRAME"===e.tagName}}],o&&r(i.prototype,o),a&&r(i,a),Object.defineProperty(i,"prototype",{writable:!1}),e}();window.IframeMessager=o})();