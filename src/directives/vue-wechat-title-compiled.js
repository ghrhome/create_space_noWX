'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function install(Vue) {
  var setWechatTitle = function setWechatTitle(title, img) {
    if (title === undefined || window.document.title === title) {
      return;
    }
    document.title = title;
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';

      iframe.setAttribute('src', img || '/favicon.ico');
      var iframeCallback = function iframeCallback() {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback);
          document.body.removeChild(iframe);
        }, 0);
      };
      iframe.addEventListener('load', iframeCallback);
      document.body.appendChild(iframe);
    }
  };
  Vue.directive('wechat-title', function (el, binding) {
    setWechatTitle(binding.value, el.getAttribute('img-set') || null);
  });
}

var VueWechatTitle = {
  install: install
};

exports.default = VueWechatTitle;

//# sourceMappingURL=vue-wechat-title-compiled.js.map