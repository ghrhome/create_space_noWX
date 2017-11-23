<template>
  <div class="ys-page-edit">
    <group>
      <x-input  placeholder="请输入用户名" :value="name" @input='inputUpdate'/>
    </group>

    <div class="ys-bottom-wrapper">
      <cell-box>
        <x-button type="default" @click.native="submitInput($event)">提交</x-button>
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
  import { stringTrim } from 'vux'

  import mainConfig from '@/main_config'
  const baseUrl=mainConfig.baseUrl;
  var tokenKey=mainConfig.tokenKey;

  export default {
    components: {
      Alert,Group, CellBox, XButton,XInput
    },
    data () {
      return {
        errorMessage:'名字不能为空',
        tmpName:'',
        showAlert:false,
      }
    },
    computed: {
      ...mapState('userInfo',{
        name:state=>state.name,
      }),
      ...mapGetters('userInfo',{
        //products: 'allProducts'
      }),
    },
    methods: {
      ...mapMutations('userInfo', {
        "setName":types.SET_NAME
      }),

      ...mapActions('userInfo', [
        'updateName'
      ]),

      inputUpdate:function(val){
        //$event.preventDefault();
        this.tmpName=val;

      },

      submitInput:function($event){
        $event.preventDefault();
        let vm=this;
        if(this.tmpName==null||stringTrim(this.tmpName)=='') {
          this.errorMessage = "名字不能为空"
          this.showAlertMsg();
          return false

        }else{
          this.$http(
            {
              method: 'post',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              url:  baseUrl+'user/update.htm',
              /*params: {
                data:{
                  'type':'name',
                  'value':vm.tmpName
                },
                session_key_1:tokenKey
              }*/
              data:{
                'type':'name',
                'value':vm.tmpName,
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
                  console.log(".....")
                  vm.updateName({name:stringTrim(this.tmpName)});
                  vm.$router.replace('userinfo');

                }else{
                  vm.errorMessage=data.msg;
                  vm.showAlertMsg();
                }
              }
            }
          )//end http;

        }

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

  .weui-cell {
    font-size: 13px;
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

