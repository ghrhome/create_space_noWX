import * as types from '../../mutation-types'

export const state = {
  initData: {

  }
}

export const getters = {
  getInitData: state => state.initData
}

export const actions = {
  loadInitData({commit}){
    return userShopCard.getInitData().then(function(data){
      commit({
        type: types.SET_INITDATA,
        initData: data.data.data
      })
    });
  }
}

export const mutations = {
  [types.SET_INITDATA](state,payload){
    state.initData = payload.initData;
  }
}

