<template>
  <div id="user-info" >
    <group class="user-cell-wrapper">
      <!--<cell is-link class="user-info-figure" @click.native="editFigture">-->
      <cell is-link class="user-info-figure" @click.native="takePhoto" style="padding:10px 0;">
        <span slot="title">我的头像</span>
        <em slot="default" class="ys-figure ys-figure-md" v-bind:style="{backgroundImage:'url('+figure+')'}"></em>
      </cell>
    </group>

    <group class="user-cell-wrapper">
      <cell is-link @click.native="editAliasName('')">
        <span slot="title">昵称</span>
        <em slot="default" >{{name}}</em>
      </cell>

      <!--<cell is-link @click.native="editTel('')">-->

        <cell is-link @click.native="editTel('')">
          <span slot="title">手机号</span>
          <em slot="default" >{{phone}}</em>
        </cell>

        <!--  <cell is-link link="resetpassword">
            <span slot="title">重置密码</span>
          </cell>-->
    </group>

    <!--  <group class="ys-submit-wrapper">
        <x-button type="default" @click.native="userLogout()" >退出登录</x-button>
      </group>
  -->
    <!--编辑头像-->
    <actionsheet v-model="show_figure" :menus="menus_photo" :close-on-clicking-mask="false"  @on-click-menu="takePhoto" show-cancel></actionsheet>

    <alert v-model="showAlert" :content="errorMessage" class="ys-alert"></alert>
  </div>
</template>
<script>
  import { Alert,Actionsheet,PopupPicker,PopupRadio,Group, Cell, Picker,XInput,  XButton, Popup } from 'vux'
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'

  import mainConfig from '@/main_config'
  const baseUrl=mainConfig.baseUrl;
  var tokenKey=mainConfig.tokenKey;

  export default {
    components: {
      Alert,Actionsheet,PopupPicker,PopupRadio,Popup,Group, Cell, Picker,  XButton,XInput
    },
    computed: {
      ...mapState('userInfo',{
        name:state=>state.name,
        figure:state=>state.figure,
        phone:state=>state.phone,
      }),
      ...mapGetters('userInfo',{
        //products: 'allProducts'
      }),

    },
    methods: {
      ...mapMutations('userInfo',{

      }),

      ...mapActions('userInfo',[
          'logout',

          'updateFigure'
      ]),
      editFigture (){
        this.show_figure=true;
      },
      /*takePhoto(menuKey, menuItem){*///old 通过本地菜单调取微信拍照或相册
      takePhoto(){
        let vm=this;
        let images=vm.images;
        //let _souceType=menuKey;

        vm.$wechat.chooseImage({
          count: 1, // 默认9，这里每次只处理一张照片
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          //sourceType: [_souceType], // 可以指定来源是相册还是相机，默认二者都有
          sourceType: [ 'album',"camera"],
          success: function (res) {
            console.log(res);
            images.localId = res.localIds;
            vm.uploadPhoto();
          }
        });
      },
      userLogout(){
        let vm=this;
        this.$http(
          {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url:  baseUrl+'user/logout.htm',
            /*params: {
              data:{
              },
              session_key_1:tokenKey
            }*/
            data:{
              session_key_1:tokenKey
            },

          }
        ).then(
          res=>{
            console.log(res)
            if (res.status == 200) {
              var data = res.data;
              if(data.code==0){
                vm.logout();
              }else{
                vm.errorMessage=data.msg;
                vm.showAlertMsg();
              }
            }
          }
        )//end http;
      },
      uploadPhoto(){
        let vm=this;
        let images=vm.images;
        var i = 0, length = images.localId.length;
        function _upload(){
          vm.$wechat.uploadImage({
            localId: images.localId[i],
            success: function(res) {
              i++;
              console.log('已上传：' + i + '/' + length);
              images.serverId.push(res.serverId);

              // res.serverId 就是 media_id，根据它去微信服务器读取图片数据：
              var indata = {"media_id":res.serverId};

              vm.updateUserInfo('figure',res.serverId);

              if (i < length) {
                _upload();
              }
            },

            fail: function(res) {
              this.errorMessage=response.data.msg;
              this.showAlertMsg();
            }

          });
        }
        _upload();
      },


      editAliasName (val){
        //this.show_aliasName=true;
        this.$router.push({
          path:'setusername'
        })
      },
      editTel (val){
         //this.show_tel=true;
          //set store.userinfo.phone
          this.$router.push({
              path:'setphonenum'
          })
      },

      updateUserInfo(type,val){
        console.log("update user info")
        console.log(type);
        console.log(val);
        this.$http(
          {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url:  baseUrl+'user/update.htm',
            /*params: {
              data:{
                'type':type,
                'value':val
              },
              session_key_1:tokenKey
            }*/
            data:{
              'type':type,
              'value':val,
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
               //update...
                console.log(data);
                let _value=null
                switch(type){
                  case 'figure':
                    _value=data.data.userIcon;
                    this.updateFigure({figure:_value});
                    break;
                }
              }else{
                this.errorMessage=data.msg;
                this.showAlertMsg();
              }
            }
          }
        )//end http;

      },

      showAlertMsg () {
        this.showAlert=true;
      },
    },
    data () {
      return {
        showAlert:false,
        errorMessage:'',
        //title和选择值放到本页面，其它放到vuex
        show_figure:false,
        show_aliasName:false,
        show_tel:false,
        menus_photo: {
          album: '从相册选择',
          camera: '拍照'
        },
        showPopupPicker: false,
        images : {
            localId: [],
            serverId: []
          }
      }
    },

    created () {
      //this.$store.dispatch('userInfo/getUserInfo')
      //this.getAllProducts();
      console.log(this.$route);
    }
  }
</script>
<style lang="less">
  @fontcolor:#767676;
  #user-info{
    padding:60px 44px;

  .user-cell-wrapper,.ys-submit-wrapper{
  &>.weui-cells{
     margin-top:0;
     margin-bottom:0;
     box-shadow:none;
     font-size:13px;

  &:before{display: none;}
  &:after{display: none;}
  .weui-cell{
    line-height: 24px;
    padding:20px 0;
    font-size:13px;
    &:before{
       left:0;
       border-top:solid 1px #dfe1e2;
       transform: scaleY(1);

     }
    .weui-cell__ft{
      padding-right:16px;
      &:after{
         color:#000;
         border-width: 1px 1px 0 0;
         border-color: #000;}
      & > em{
          color:@fontcolor;
        }
      }
  }
  .weui-btn{
    height:44px;
    line-height:44px;
    border-radius:0;
    background-color:#fff;
    font-size:16px;
    &:after{
       border:0;
       border-radius:0;
     }
  }
  .vux-popup-picker-value{
    color: @fontcolor
  }
  .user-info-figure{
  .weui-cell__ft{
    padding-right:0;
  &:after{
     display: none;
   }
  }
  }
  }


  }


  }
</style>
<style lang="less" scoped>
    @bgcolor:#fff;
    @fontcolor:#767676;
    #user-info{
      background-color:@bgcolor;
      .user-cell-wrapper{
          font-size:13px;
        border-top:solid 1px #dfe1e2;
        border-bottom:solid 1px #dfe1e2;
        & + .user-cell-wrapper{
           border-top:0;
         }

      }

    }
</style>

