// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from '@/router'
import store from '@/store'
import * as types from '@/store/mutation-types'
import App from '@/App'

import { currency } from '@/filters/currency'
import { WechatPlugin,AjaxPlugin,AlertPlugin,LoadingPlugin,ConfirmPlugin} from 'vux'
import Plugin from './plugin'
import vueWechatTitle from '@/directives/vue-wechat-title'
import mainConfig from '@/main_config'

Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin)
Vue.use(vueWechatTitle)
Vue.use(Plugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)  //this.$http
//可以直接访问 wx 对象。之后任何组件中都可以通过 this.$wechat 访问到 wx 对象。
const wx = Vue.wechat
const http = Vue.http

// 设置全局 http Content Type
http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置 HttpSessionKey
function setHttpSessionKey(){
  http.defaults.transformRequest = [function(data){
    if(data==null){
      data = "session_key_1="+mainConfig.tokenKey;

    }else if(typeof data=="string"&&data.indexOf("=")>-1){
      data += "&session_key_1="+mainConfig.tokenKey;
    }else if(typeof data=='object'){
      data="data="+JSON.stringify(data)
    }
    return data;
  }];
}

setHttpSessionKey();


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.filter('currency',currency);

const baseUrl=mainConfig.baseUrl;
var tokenKey=mainConfig.tokenKey;

var curUrl=encodeURIComponent(location.href.split("#")[0]);
http.get(baseUrl+'occ/getJsApiConfig.htm?'+'data={"url":"'+curUrl+'"}&session_key_1='+tokenKey).then(res=>{
  if(res.status==200 ){
    var data=res.data;
    var code=data.code;

    if(code=='101'){
      //no openid
      var openidUrl=data.data.redirectWechatUrl;
      var _tk=data.data.session_key_1;
      localStorage.setItem('tokenKey',_tk);
      localStorage.setItem("openRoute",location.href);
      location.href=openidUrl+'?data={"url":"'+curUrl+'"}&session_key_1='+_tk;

    }else{
      store.commit(types.SET_OPENID,{openid:true});

      let _openRoute=window.localStorage.getItem("openRoute");
      if(typeof _openRoute !=="undefined" && _openRoute !==null ){
        window.localStorage.removeItem("openRoute");
        location.href=_openRoute;
      }

      _setWxFunc(data.data);
      _checkLogin( _init);


    }
  }else{
    console.log("-------------not 200");
    alert('网络错误，请重试')
  }
});

function _checkLogin(cb){
    http({
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},

      url: baseUrl+'user/checkLogin.htm',
     /* params: {
        session_key_1:tokenKey
      },*/
      data:{
        "session_key_1":tokenKey
      }
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


function _setWxFunc(wxData){
  /*
*-------------------------- 微信分享 ----------------------
*/
/*  if (process.env.NODE_ENV === 'production') {*/
if(true){
    wx.ready(() => {
      console.log('wechat ready');
      wx.onMenuShareAppMessage({
        title: '宝龙美术馆', // 分享标题
        //link: 'http://www.yueworld.cn', // 分享链接
        //imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareTimeline({
        title: '宝龙美术馆', // 分享标题
        desc: '基于资产打造层层管理系统，从资管到商管，一路贯通', // 分享描述
        //link: 'http://www.yueworld.cn', // 分享链接
        //imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    });



    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wxData.appId, // 必填，公众号的唯一标识
      timestamp: wxData.timestamp, // 必填，生成签名的时间戳
      nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
      signature: wxData.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',"chooseImage", "previewImage", "uploadImage", "downloadImage","scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // 基本思路是，上传图片到微信服务器->下载多媒体接口讲图片下载到服务器->返回服务器存储路径->前台显示
    });

  }//end 微信分享

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
