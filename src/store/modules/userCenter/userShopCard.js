/**
 * Created by whobird on 17/8/21.
 */
import userShopCard from '../../../api/userCenter/userShopCard'
import {$keys} from '../../../api/userCenter/userShopCard'
import * as types from '../../mutation-types'

const namespaced=true;

// initial state
const state = {
  $keys,
  initData: {

  }
}

// getters
const getters = {

}

// actions
const actions = {
  getCardList({commit},payload){
    return userShopCard.getCardList(payload);
  },
  activateCard({commit},payload){
    return userShopCard.activateCard(payload);
  }
}

// mutations
const mutations = {
  [types.SET_INITDATA](state,payload){
    state.initData = payload.initData;
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
