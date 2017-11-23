/**
 * Created by whobird on 17/8/21.
 */
import * as types from '../mutation-types'
import {  ChinaAddressV3Data, Value2nameFilter as value2name } from 'vux'

const namespaced=true;

// initial state

const state = {
  name:'Jerry',
  id:'',
  figure:'./static/assets/figure_default@2x.png',
  badge:'badge-1',
  qrcode:'',
  sex:'male',
  phone:'13888888888',
  location:['上海市', '市辖区', '长宁区'],
  locationString:''
}

// getters
const getters = {
  getName: state => state.name,
  getFigure: state => state.figure,
  getBadge: state => state.badge,
  getQrCode:state=>state.qrcode,
  getSex:state=>state.sex,
  getPhone:state=>state.phone,
  getLocation:state=>state.location
}

// actions
const actions = {
  /*getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }*/
  getUserInfo ({ commit }) {
    console.log("get user info---------------")
  },

  updateUserInfo(context,payload){
      //update
      context.commit(types.SET_USERINFO,payload);
  },
  updatePhone(context,{phoneNum}){
    context.commit(types.SET_PHONE_NUM,{
      phoneNum
    });
  },
  updateName(context,{name}){
    context.commit(types.SET_NAME,{
      name
    });
  },
  updateSex(context,{sex}){
    context.commit(types.SET_SEX,{
      sex
    });
  },
  updateLocation(context,{location}){
    context.commit(types.SET_LOCATION,{
      location
    });
  },
  updateFigure(context,{figure}){
    context.commit(types.SET_FIGURE,{
      figure
    });
  },

  logout(context){
    context.dispatch('logout', null, { root: true }) // -> 'someOtherAction'
  }
}

// mutations
const mutations = {
  [types.SET_USERINFO](state,payload){

      state.id=payload.id;
      state.name=payload.nickname||'Name';
      state.figure=payload.userIcon||'./static/assets/figure_default@2x.png';
      state.phone=payload.mobile;
      state.address=payload.address;
      state.badge=payload.badge||'badge-0';
      //state.badge=payload.badge;
      //state.qrcode=unescape(payload.userQrCode);
      state.qrcode=decodeURIComponent(payload.userQrCode);

  },
  [types.SET_PHONE_NUM] (state, { phoneNum }) {
    state.phone = phoneNum
  },
  [types.SET_NAME] (state, { name }) {
    state.name = name
  },
  [types.SET_SEX] (state, { sex }) {
    state.sex = sex
  },

  [types.SET_LOCATION] (state, { location }) {
    state.location = location;
    state.locationString=value2name(location, ChinaAddressV3Data)
  },

  [types.SET_FIGURE] (state, { figure }) {
    state.figure = figure;
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
