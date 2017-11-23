/**
 * Created by whobird on 17/8/17.
 */
import * as types from './mutation-types'
import router from '../router'

/*export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}*/

export const setOpenid=(context,hasOpenid)=>{
  context.commit(types.SET_OPENID,{
    openid:hasOpenid
  })
}

export const setLogin=(context,hasLogin)=>{
  context.commit(types.SET_LOGIN,{
    login:hasLogin
  })
}

export const logout=(context)=>{
  console.log("logout-------------")
  context.commit(types.SET_LOGIN,{
    login:false
  });
  localStorage.setItem("login",false);
  //localStorage.setItem('tokenKey','');
  router.replace('login')
}
