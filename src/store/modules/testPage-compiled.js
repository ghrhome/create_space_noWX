'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations;

var _shop = require('../../api/shop');

var _shop2 = _interopRequireDefault(_shop);

var _mutationTypes = require('../mutation-types');

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespaced = true;

var state = {
  name: 'page test',
  all: []
};

var getters = {
  allProducts: function allProducts(state) {
    return state.all;
  }
};

var actions = {
  getAllProducts: function getAllProducts(_ref) {
    var commit = _ref.commit;

    _shop2.default.getProducts(function (products) {
      commit(types.RECEIVE_PRODUCTS, { products: products });
    });
  }
};

var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.RECEIVE_PRODUCTS, function (state, _ref2) {
  var products = _ref2.products;

  state.all = products;
}), (0, _defineProperty3.default)(_mutations, types.ADD_TO_CART, function (state, _ref3) {
  var id = _ref3.id;

  state.all.find(function (p) {
    return p.id === id;
  }).inventory--;
}), _mutations);

exports.default = {
  namespaced: namespaced,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

//# sourceMappingURL=testPage-compiled.js.map