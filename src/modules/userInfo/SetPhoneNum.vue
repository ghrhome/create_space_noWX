<template>
  <div class="ys-page-edit">
    <!--<group>
      <x-input  placeholder="请输入手机" :value="phoneNum" @input='inputUpdate' keyboard="number" is-type="china-mobile" id="phone-num"/>
    </group>-->

    <group>
      <x-input title="手机" keyboard="number" is-type="china-mobile" placeholder="请输入手机" :value="phoneNum" @input='inputUpdate' id="phone-num">
        <x-button slot="right" type="primary" mini @click.native="sendVeriCode($event)" id="btn-vericode"  v-bind:class="{disabled:veriBtnDisabled}">{{veriBtn}}</x-button>
      </x-input>
      <x-input title="验证码" placeholder="请输入验证码" v-model="inputVeri">
      </x-input>
    </group>

    <div class="ys-bottom-wrapper">
      <cell-box>
        <x-button type="default" @click.native="submitInput($event)" >提交</x-button>
      </cell-box>
    </div>


    <alert v-model="showAlert" :content="errorMessage" class="ys-alert"></alert>
  </div>
</template>

<script>
  import { Alert,Group, CellBox, XButton,XInput} from 'vux'
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  import $ from 'jquery'

  import mainConfig from '@/main_config'
  const baseUrl=mainConfig.baseUrl;

  export default {
    components: {
      Alert,Group, CellBox, XButton,XInput
    },
    data () {
      return {
        veriCode:null,
        inputVeri:null,
        timeCount:60,
        veriBtn:'发送验证码',
        veriBtnDisabled:false,

        errorMessage:'请输入有效的手机号码',
        tmpPhone:'',
        showAlert:false,
      }
    },
    computed: {
      ...mapState('userInfo',{
        phoneNum:state=>state.phone,
      }),
      ...mapGetters('userInfo',{
        //products: 'allProducts'
      }),
    },
    methods: {
      ...mapMutations('userInfo', {
        "setPhoneNum":types.SET_PHONE_NUM
      }),

      ...mapActions('userInfo', [
          'updatePhone'
      ]),
      checkVeriCode:function(vericode){

        if (this.veriCode == true && this.inputVeri!='') {
          return true
        }
        return false

      },
      resetCountDown(){
        this.veriBtnDisabled=false;
        this.veriBtn='发送验证码';
      },
      countDownStart(){
        var vm=this;
        vm.veriBtnDisabled=true;
        vm.veriBtn=vm.timeCount;
        var _countDown= function(){
          if(vm.veriBtn==0){
            vm.resetCountDown();
            return;
          }else{
            setTimeout(function(){
              vm.veriBtn-=1;
              _countDown()
            },1000)
          }
        }
        _countDown();
      },
      sendVeriCode($event){
        console.log(this.tmpPhone);
        $event.preventDefault();
        if(this.veriBtnDisabled==true){
          return false;
        }

        if(this.tmpPhone==null||$($event.target).closest('.vux-x-input').hasClass('weui-cell_warn')){
          this.errorMessage="请输入正确的手机号码"
          this.showAlertMsg();
          return false;
        }
        this.countDownStart();


        this.$http(
          {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            url: baseUrl+'user/sendSmsForVerifyCode.htm',
           /* params: {
              data:{
                mobile: this.tmpPhone,
                validateMobile:true,
                channel:'register'
              },
              session_key_1:tokenKey
            },*/
            data:{
              mobile: this.tmpPhone,
              validateMobile:true,
              channel:'register',
            },
          }
        ).then(
          res=> {
            console.log(res);
            if (res.status == 200) {
              var data = res.data;
              console.log(data);
              if(data.code==0){
                this.veriCode=true;
              }else if(data.code==1){
                this.errorMessage=data.msg;
                this.showAlertMsg();
              }
            }
          }
        );//end $http

      },
      inputUpdate:function(val){
        //$event.preventDefault();
        this.tmpPhone=val;

      },

      submitInput:function($event){
        $event.preventDefault();
        let vm=this;

        if(this.tmpPhone==null||$("#phone-num").hasClass('weui-cell_warn')) {
          this.errorMessage = "请输入正确的手机号码"
          this.showAlertMsg();
          return false
        }

        var checkVeriCode=this.checkVeriCode();
        if(!checkVeriCode){
          this.errorMessage = "请输入验证码"
          this.showAlertMsg();
          return false;
        }

          this.$http(
            {
              method: 'post',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              url:  baseUrl+'user/update.htm',
              /*params: {
                data:{
                  'type':'mobile',
                  'value':vm.tmpPhone,
                  'code':vm.inputVeri
                },
                session_key_1:tokenKey
              }*/
              data:{
                'type':'mobile',
                'value':vm.tmpPhone,
                'code':vm.inputVeri,
                'session_key_1':tokenKey
              },
            }
          ).then(
            res=>{
              console.log(res)
              if (res.status == 200) {
                var data = res.data;
                console.log(data);
                if(data.code==0){

                  vm.updatePhone({phoneNum:this.tmpPhone});
                  vm.$router.go(-1);

                }else{
                  vm.errorMessage=data.msg;
                  vm.showAlertMsg();
                }
              }
            }
          )//end http;

      },

      showAlertMsg () {
        this.showAlert=true;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ys-page-edit{

    .weui-cell{
      font-size:13px;
      line-height: 34px;
      padding: 5px 15px;

    button#btn-vericode{
      background-color: #333;
      border-radius:26px;
     /* position: absolute;*/
      bottom: 0;
      right: 0px;
      height: 26px;
      line-height: 26px;
      width: 100px;
      font-size:12px !important;
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

      .ys-bottom-wrapper{
        position: absolute;
        bottom: 0;
        width: 100%;
        .vux-cell-box{
          padding:0;
          .weui-btn{
            height:50px;
            width:100%;
            line-height:50px;
            border-radius:0;
            background-color:#000;
            color:#fff;
          &:after{
             border:0;
             border-radius:0;
           }
          }

        }

      }
    }
</style>
