<template>
  <div id="login" >
    <div class="login-wrapper">
      <group >
        <x-input title="手机" keyboard="number" is-type="china-mobile" placeholder="手机号" v-model="phoneNum" id="phone-input">
          <em slot="label"  class="ys-icon ys-icon-tel" style="width:20px;height:20px;"></em>
        </x-input>

        <x-input title="密码" placeholder="密码" type="password" v-model="password">
          <em slot="label"  class="ys-icon ys-icon-lock"></em>
        </x-input>

      </group>


      <cell-box class="ys-cellbox-noborder" style="margin-top:50px;">
        <x-button type="default" @click.native="login($event)">登录</x-button>
      </cell-box>

      <cell-box class="ys-cellbox-noborder" style="padding:8px 0;">
        <div class="clearfix" style="width:100%;">
          <router-link to="register" class="ys-text pull-left" >注册</router-link>
          <router-link to="resetpassword" class="ys-text pull-right">忘记密码?</router-link>
        </div>
      </cell-box>
    </div>

    <alert v-model="showAlert" :content="errorMessage" class="ys-alert"></alert>
  </div>

</template>
<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'

  import { Alert,Group,XInput,XButton,CheckIcon,CellBox} from 'vux'
  import $ from 'jquery'

  import qs from "qs"

  import mainConfig from '@/main_config'
  const baseUrl=mainConfig.baseUrl;

  export default {
    components: {
      Alert,
      Group,
      XInput,
      XButton,
      CheckIcon,
      CellBox
    },
    data:function(){
      return {
        phoneNum:null,
        password:null,
        veriCode:null,
        errorMessage:'',
        showAlert:false,
      }
    },
    computed: {
      ...mapState({
          hasLogin:state => state.login
        }),
    },
    methods:{
      ...mapMutations({
          setLogin:types.SET_LOGIN
      }),

      ...mapMutations('userInfo',{

      }),

      ...mapActions('userInfo',[
        'updateUserInfo',
      ]),

      showAlertMsg () {
        this.showAlert=true;
      },

      login($event){
        $event.preventDefault();
        var vm=this;

        console.log(vm.$refs.phoneInput)
        if (this.phoneNum == null || $("#phone-input").closest('.vux-x-input').hasClass('weui-cell_warn')) {
          this.errorMessage = "请输入正确的手机号码";
          this.showAlertMsg();
          return false;
        }

        this.$http(
          {
            method: 'post',
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            //headers: {'Content-Type': 'application/json;charset=UTF-8'},
            url:  baseUrl+'user/login.htm',
            /*params: {
              data:{
                mobile: this.phoneNum,
                pwd: this.password,
              },
              session_key_1:tokenKey
            }*/
            data:{
              mobile: this.phoneNum,
              pwd: this.password,
            },
            emulateJSON: true
          }
        ).then(
          response=> {
            if(response.data.code==100){

              this.errorMessage = response.data.msg;
              this.showAlertMsg();
              return false;
            }
            var not_verified = (response.data.code==1);
            if (not_verified) {
              this.errorMessage = response.data.msg;
              this.showAlertMsg();
              return false;
            } else {
              //这里根据逻辑改进，登陆至初始登陆页面
              //setlogin true & get user info
              vm.setLogin({
                login:true
              });

              vm.$vux.alert.show({
                content: '登录成功',
                onShow () {
                },
                onHide () {
                  vm.updateUserInfo(response.data.data);

                  let _lastRoute=window.localStorage.getItem("lastRoute");

                  if(typeof _lastRoute !=="undefined" && _lastRoute !==null ){
                    vm.$router.replace(_lastRoute)
                    window.localStorage.removeItem("lastRoute");
                  }else{
                    vm.$router.replace('usercenter')
                  }

                }
              })

            }

          }).catch(
              error=>{
                console.log(error);
                vm.errorMessage('网络错误，请稍后再试')
                vm.showAlertMsg();
           });


      },

    }

  }
</script>

<style lang="less" scoped>
  @urlcolor: #000;

  #login{
    background-color:#fff;
    height:100%;
    position:relative;
    .login-wrapper{
        padding:75px 44px;
    }
    #cell-register{
      /*position:absolute;*/
      margin-top:60px;
      width:100%;
      text-align: center;
    }
  .weui-cell{
    font-size:13px;
   /* padding-left:0;
    padding-right:0;*/
    padding:10px 0;
    padding-top:29px;
    &:before{left:0}
    &.ys-cellbox-noborder:before{border-top:0;}

    button#btn-vericode{
      background-color: #000;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 34px;
      line-height: 34px;
      width: 100px;
      font-size:12px;
      &.disabled{
        background-color:#c9c9c9;
       }
      &.disabled:after{
        content:"s";
        display:inline-block;
        position:relative;
         width: auto;
         transform: scale(1);
         -webkit-transform:scale(1);
        border:0;
      }
      }
    }

    button.weui-btn{
      background-color:#000;
      color:#fff;
      font-size:14px;
      border-radius:0;
      height:44px;
      line-height:44px;
      &:after{display: none;}
    }

    a{
      color:@urlcolor;
      em.ys-icon-lost-key{
        float:left;
        margin-top:3px;
        margin-right:5px;
        }
    }


  }


</style>
