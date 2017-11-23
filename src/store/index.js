/**
 * Created by whobird on 17/8/17.
 */

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

import testPage from './modules/testPage'

import userInfo from './modules/userInfo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

  modules: {
    testPage,
    userInfo,
  },
  strict: debug,
  plugins: []
})
