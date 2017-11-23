'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _currency = require('./filters/currency');

var _vux = require('vux');

var _vueWechatTitle = require('./directives/vue-wechat-title');

var _vueWechatTitle2 = _interopRequireDefault(_vueWechatTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueWechatTitle2.default);
_vue2.default.use(_vux.WechatPlugin);
_vue2.default.use(_vux.AjaxPlugin);

console.log(_vue2.default.wechat);

_fastclick2.default.attach(document.body);

_vue2.default.config.productionTip = false;

_vue2.default.filter('currency', _currency.currency);

new _vue2.default({
  router: _router2.default,
  store: _store2.default,
  render: function render(h) {
    return h(_App2.default);
  }
}).$mount('#app-box');

//# sourceMappingURL=main-compiled.js.map