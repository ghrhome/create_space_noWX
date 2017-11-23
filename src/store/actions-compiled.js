'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = undefined;

var _mutationTypes = require('./mutation-types');

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addToCart = exports.addToCart = function addToCart(_ref, product) {
  var commit = _ref.commit;

  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    });
  }
};

//# sourceMappingURL=actions-compiled.js.map