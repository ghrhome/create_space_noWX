/**
 * Created by whobird on 17/8/21.
 */
import userShopTicket from '../../../api/userCenter/userShopTicket'
import {$keys} from '../../../api/userCenter/userShopTicket'
import * as types from '../../mutation-types'

const namespaced=true;

// initial state
const state = {
  $keys

}

// getters
const getters = {

}

// actions
const actions = {
  payTicket ({commit},payload) {
    return userShopTicket.payTicket(payload);
  }
}

// mutations
const mutations = {

}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
