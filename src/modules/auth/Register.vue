<template>
  <div id="register">
    <div class="login-wrapper">
      <group>
        <x-input title="手机" is-type="china-mobile" placeholder="请输入手机" v-model="phoneNum" id="phone-input">
          <em slot="label" class="ys-icon ys-icon-tel"></em>

        </x-input>

        <x-input title="验证码" placeholder="请输入验证码" v-model="inputVeri">
          <em slot="label" class="ys-icon ys-icon-shield"></em>

          <x-button slot="right" type="primary" mini @click.native="sendVeriCode($event)" id="btn-vericode"
                    v-bind:class="{disabled:veriBtnDisabled}">{{veriBtn}}
          </x-button>
        </x-input>

        <x-input title="密码" type="password"  placeholder="" v-model="password"
                 placeholder="请输入密码">
          <em slot="label" class="ys-icon ys-icon-lock"></em>
        </x-input>
        <!-- <x-input title="确认密码" v-model="password2" type="text" placeholder="" :equal-with="password" placeholder="请确认密码">
           <em slot="label"  class="ys-icon ys-icon-verify"></em>
         </x-input>-->

      </group>


      <cell-box class="ys-cellbox-noborder" style="margin-top:50px;">
        <x-button type="default" @click.native="register($event)">注册</x-button>
      </cell-box>
      <cell-box class="ys-cellbox-noborder" style="padding:10px 0;">
        <div class="clearfix" style="width:100%;padding-left: 4px;">
          <router-link to="login" class="ys-text pull-left" style="color:#333;">登录</router-link>
          <check-icon class="pull-right" :value.sync="agree" >我同意
            <router-link to="agreement" class="ys-text ys-text-red ">用户协议</router-link>
          </check-icon>

        </div>
      </cell-box>
    </div>


    <alert  v-model="showAlert" :content="errorMessage" class="ys-alert"></alert>


  </div>

</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'

  import {Alert, Group, XInput, XButton, CheckIcon, CellBox} from 'vux'
  import $ from 'jquery'

  import mainConfig from '@/main_config'
  const baseUrl=mainConfig.baseUrl;
  var tokenKey=mainConfig.tokenKey;


  export default {
    components: {
      Alert,
      Group,
      XInput,
      XButton,
      CheckIcon,
      CellBox
    },
    data: function () {
      return {
        phoneNum: null,
        password: null,
        veriCode: null,
        inputVeri: null,
        timeCount: 60,
        veriBtn: '发送验证码',
        veriBtnDisabled: false,
        errorMessage: '',
        showAlert: false,
        agree: true,
      }
    },
    computed: {
      ...mapState({
        hasLogin:state => state.login
      }),

      getCountDown() {
        this.timeCount -= 1;
      },

    },
    methods: {
      ...mapMutations({
          "setLogin":types.SET_LOGIN,
      }),
      ...mapMutations('userInfo',{

      }),

      ...mapActions('userInfo',[
        'updateUserInfo',
      ]),

      checkVeriCode: function (vericode) {
        console.log(this.veriCode)
        console.log(this.inputVeri)
        if (this.veriCode == true && this.inputVeri!='') {
          return true
        }
        return false
      },
      resetCountDown() {
        this.veriBtnDisabled = false;
        this.veriBtn = '发送验证码';
      },
      countDownStart() {
        var vm = this;
        vm.veriBtnDisabled = true;
        vm.veriBtn = vm.timeCount;
        var _countDown = function () {
          if (vm.veriBtn == 0) {
            vm.resetCountDown();
            return;
          } else {
            setTimeout(function () {
              vm.veriBtn -= 1;
              _countDown()
            }, 1000)
          }
        }
        _countDown();
      },
      sendVeriCode($event) {
        $event.preventDefault();
        if(this.veriBtnDisabled==true){
          return false;
        }
        if (this.phoneNum == null || $("#phone-input").closest('.vux-x-input').hasClass('weui-cell_warn')) {
          this.errorMessage = "请输入正确的手机号码";
          this.showAlertMsg();
          return false;
        }


        this.$http(
          {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            url: baseUrl+'user/sendSmsForVerifyCode.htm',
           /* params: {
              data:{
                mobile: this.phoneNum,
                validateMobile:true,
                channel:'register'
              },
              session_key_1:tokenKey
            },*/
            data:{
              mobile: this.phoneNum,
              validateMobile:true,
              channel:'register',
            },
          }
        ).then(
          res=> {

            if (res.status == 200) {
              var data = res.data;
              if(data.code==0){
                this.veriCode=true;
                this.countDownStart();
              }else if(data.code==1){
                this.errorMessage=data.msg;
                this.showAlertMsg();
              }
            }
          }
        );
      },

      showAlertMsg() {
        this.showAlert = true;
      },
      register($event) {
        $event.preventDefault();

        var vm=this;
        if(this.agree==false){
          this.errorMessage = "请先同意用户协议"
          this.showAlertMsg();
          return false;
        }

        if (this.phoneNum == null || $("#btn-vericode").closest('.vux-x-input').hasClass('weui-cell_warn')) {
          this.errorMessage = "请输入正确的手机号码";
          this.showAlertMsg();
          return false;
        }

        var checkVeriCode = this.checkVeriCode();
        if (!checkVeriCode) {
          this.errorMessage = "请输入验证码"
          this.showAlertMsg();
          return false;
        }


        this.$http(
          {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url:  baseUrl+'user/register.htm',
            data:{
              mobile: this.phoneNum,
              pwd: this.password,
              code:this.inputVeri,
            },
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
            this.$vux.alert.show({
              content: '注册成功',
              onShow () {
              },
              onHide () {
                //setlogin true & get user info
                vm.setLogin({
                  login:true
                });
                vm.updateUserInfo(response.data.data);
                vm.$router.replace('usercenter')
              }
            });


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
  @urlcolor : #d51c1a;
  @img-base-url:'../../static/images';
  #register {
    background-color:#fff;
    height:100%;
  .login-wrapper {
    padding: 75px 44px;
  }

  .weui-cell {
    font-size: 13px;
    padding:10px 0;
    padding-top:29px;

    &:before {
      left: 0
    }

    &.ys-cellbox-noborder:before {
      border-top: 0;
    }

  button#btn-vericode {
    background-color: #333;
    border-radius:26px;
    position: absolute;
    bottom: 7px;
    right: 0;
    height: 26px;
    line-height: 26px;
    width: 100px;
    font-size:12px !important;

  &.disabled {
    background-color: #c9c9c9;
  }

  &.disabled:after {
    content: "s";
    display: inline-block;
    position: relative;
     width: auto;
     transform: scale(1);
     -webkit-transform:scale(1);
    border:0;
  }

  }
  }

  button.weui-btn {
    background-color: #000;
    color: #fff;
    font-size:14px;
    height:44px;
    line-height:44px;
    border-radius:0;

  &:after {
    display: none;
  }

  }

  a {
    color: @urlcolor;

  em.ys-icon-lost-key {
    float: left;
    margin-top: 3px;
    margin-right: 5px;
  }

  }

  }


</style>
