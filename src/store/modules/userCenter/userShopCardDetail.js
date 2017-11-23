/**
 * Created by whobird on 17/8/21.
 */
import userShopCard from '../../../api/userCenter/userShopCardDetail'
import {$keys} from '../../../api/userCenter/userShopCardDetail'
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
  loadInitData({commit},payload){
    if(payload.params.isMy){
      return userShopCard.getUserCard(payload).then(function(data){
        commit({
          type: types.SET_INITDATA,
          initData: data.data.data ? data.data.data[0] : null
        })
      });
    }else {
      return userShopCard.getCardById(payload).then(function(data){
        commit({
          type: types.SET_INITDATA,
          initData: data.data.data
        })
      });
    }
  },
  payCard({commit},payload) {
    return userShopCard.payCard(payload);
  },
  buyCard({commit},payload){
    return userShopCard.buyCard(payload);
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
