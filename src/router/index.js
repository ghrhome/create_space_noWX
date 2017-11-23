import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/index'
import TestPage from '@/modules/TestPage'

import mainConfig from '@/main_config'

//根据开发环境做相应配置
//const env=mainConfig.env;

Vue.use(Router);

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
});


var routes = [
  {
    path: '*',
    name: '404',
    meta: {
      title: '建设中'
    },
    //component: HelloVux
    component: function (resolve) {
      require(['@/modules/404/404.vue'], resolve)
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: function (resolve) {
      require(['@/modules/TestPage/index.vue'], resolve)
    }
  },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登陆'
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/auth/Login.vue'], resolve)
      }

    },

    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '用户注册'
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/auth/Register.vue'], resolve)
      }

    },

    {
      path: '/resetpassword',
      name: 'ResetPassword',
      meta: {
        title: '找回密码'
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/auth/ResetPassword.vue'], resolve)
      }

    },


    {
      path: '/agreement',
      name: 'Agreement',
      meta: {
        title: '用户协议'
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/auth/Agreement.vue'], resolve)
      }

    },


    {
      path: '/userinfo',
      name: 'UserInfo',
      meta: {
        title: '我的资料',
        needLogin:true,
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/userInfo/UserInfo.vue'], resolve)
      }

    },

    {
      path: '/setusername',
      name: 'SetUserName',
      meta: {
        title: '设置用户名',
        needLogin:true,
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/userInfo/SetUserName.vue'], resolve)
      }

    },

    {
      path: '/setphonenum',
      name: 'SetPhoneNum',
      meta: {
        title: '设置手机',
        needLogin:true,
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/userInfo/SetPhoneNum.vue'], resolve)
      }

    },


    {
      path: '/usercenter',
      name: 'UserCenter',
      meta: {
        title: '创想空间',
        needLogin:true,
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/userCenter/UserCenter.vue'], resolve)
      }
    },

    {
      path: '/userqrcode',
      name: 'UserQrCode',
      meta: {
        title: '我的二维码',
        needLogin:true,
      },
      //component: HelloVux
      component: function (resolve) {
        require(['@/modules/userCenter/UserQrCode.vue'], resolve)
      }
    },

    {
      path: '/',
      name: 'main',
      meta: {
        title: '创想空间',
        needLogin:true
      },
      //component: HelloVux
      component: function (resolve) {
        //require(['@/components/HelloFromVux'], resolve)
        require(['@/modules/userCenter/UserCenter.vue'], resolve)
      }
    },
  ];


const router=new Router({

  routes: routes
});

var routesNameArr = [];
routes.forEach(function (route, i) {
  routesNameArr.push(route.name)
});

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  /*console.log("to=======");
  console.log(to);
  console.log(store.state.login)*/
  // if (routesNameArr.indexOf(to.name) == -1) {
  //   router.replace('404');
  //   return;
  // }

  if(to.meta.needLogin==true && store.state.login==false){

    window.localStorage.setItem("lastRoute",to.path);

    router.push('/login');
    store.commit('updateLoadingStatus', {isLoading: false});
    return;
  }

  if (store.state.login == true) {
    let loginRouteArray = ['Login', 'Register'];
    if (loginRouteArray.indexOf(to.name) !== -1) {
      router.replace('usercenter');
    }
  }


  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router;
