'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _index = require('@/store/index');

var _index2 = _interopRequireDefault(_index);

var _Hello = require('@/components/Hello');

var _Hello2 = _interopRequireDefault(_Hello);

var _TestPage = require('@/modules/TestPage');

var _TestPage2 = _interopRequireDefault(_TestPage);

var _cart = require('@/modules/cart');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

_index2.default.registerModule('vux', {
  state: {
    loading: false
  },
  mutations: {
    updateLoadingStatus: function updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    }
  }
});

var router = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'HelloVux',
    meta: {
      title: '首页'
    },

    component: function component(resolve) {
      require(['@/components/HelloFromVux'], resolve);
    }

  }, {
    path: '/test',
    name: 'TestPage',
    meta: {
      title: "TEST PAGE"
    },
    component: _TestPage2.default
  }, {
    path: '/hello',
    name: 'Hello',
    meta: {
      title: '测试'
    },
    component: _Hello2.default
  }, {
    path: '/cart',
    name: 'Cart',
    meta: {
      title: '购物车'
    },
    component: _cart2.default
  }]
});

router.beforeEach(function (to, from, next) {
  _index2.default.commit('updateLoadingStatus', { isLoading: true });
  next();
});

router.afterEach(function (to) {
  _index2.default.commit('updateLoadingStatus', { isLoading: false });
});

exports.default = router;

//# sourceMappingURL=index-compiled.js.map