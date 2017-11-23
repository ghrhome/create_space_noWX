// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from '@/router'
import store from '@/store'
import * as types from '@/store/mutation-types'
import App from '@/App'

import { currency } from '@/filters/currency'
import {AjaxPlugin,AlertPlugin,LoadingPlugin,ConfirmPlugin} from 'vux'
import Plugin from './plugin'

import mainConfig from '@/main_config'

Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin)
Vue.use(Plugin)
Vue.use(AjaxPlugin)  //this.$http
//可以直接访问 wx 对象。之后任何组件中都可以通过 this.$wechat 访问到 wx 对象。

const http = Vue.http

// 设置全局 http Content Type
http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置 transformRequest
http.defaults.transformRequest = [function(data){

  if(typeof data=="string"&&data.indexOf("=")>-1){
    return data
  }else if(typeof data=='object'){
    data="data="+JSON.stringify(data)
    return data;
  }
}];


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.filter('currency',currency);

const baseUrl=mainConfig.baseUrl;

var curUrl=encodeURIComponent(location.href.split("#")[0]);

function _checkLogin(cb){
    http({
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},

      url: baseUrl+'user/checkLogin.htm',
     /* params: {
        session_key_1:tokenKey
      },*/
    }).then(
      res=>{
        console.log(res);

        if(res.data.code==0){
          var payload=res.data.data;
          store.dispatch('setLogin',true);
          store.dispatch('userInfo/updateUserInfo',payload);

        }else{

        }
        cb();
      }
    ).catch(
      error=>{
        console.log(error);
        cb();
      }
    )
}



function _init(){
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-box')
}

//_init();

_checkLogin(_init());
