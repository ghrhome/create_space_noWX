/**
 * Created by whobird on 17/8/21.
 */
import shop from '../../api/shop'
import * as types from '../mutation-types'

const namespaced=true;

// initial state
const state = {
  name:'page test',
  all: []
}

// getters
const getters = {
  allProducts: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
