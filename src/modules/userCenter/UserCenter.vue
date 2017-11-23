<template>
  <div id="user-center">
    <div class="center">
      <keep-alive>
        <swiper :imgList="imgList">
          <!-- <div slot='swiper-slide' class="swiper-slide" slot-scope="props">

           </div>-->
        </swiper>
      </keep-alive>


    </div>
    <div class="user-links-wrapper">
      <grid :cols="2">
        <grid-item v-for="(nav,index) in navList" :link="nav.bannerLinkUrl" style="width:50%;" :class="{'no-right-line':((index+1)%2==0),'no-bottom-line':checkNavBottom(index)}" :key="index">
          <img slot="icon" :src="nav.bannerLogoUrl">
          <span slot="label">{{nav.bannerName}}</span>
        </grid-item>

       <!-- <grid-item link="test" style="width:50%;" class="no-right-line">
          <img slot="icon" src="../../assets/icon_coffee@2X.png">
          <span slot="label">咖啡</span>
        </grid-item>

        <grid-item link="test" style="width:50%;" >
          <img slot="icon" src="../../assets/icon_robot@2X.png">
          <span slot="label">召唤机器人</span>
        </grid-item>

        <grid-item link="test" style="width:50%;" class="no-right-line">
          <img slot="icon" src="../../assets/icon_shop@2X.png" >
          <span slot="label">商品</span>
        </grid-item>

        <grid-item link="test" style="width:50%;" class="no-bottom-line">
          <img slot="icon" src="../../assets/icon_data_analyse@2X.png">
          <span slot="label">数据分析</span>
        </grid-item>
-->
      </grid>

    </div>
    <alert v-model="showAlert" :content="errorMessage" class="ys-alert"></alert>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  import { Group, Cell, Grid, GridItem,Alert } from 'vux'
  import Swiper from '../../components/swiper.vue'
  import mainConfig from '@/main_config'

  const baseUrl=mainConfig.baseUrl;
  const tokenKey=mainConfig.tokenKey;

  export default {
    components: {
      Group,
      Cell,
      Grid,
      GridItem,
      Swiper,
      Alert
    },
    data () {
      return {
        showAlert:false,
        errorMessage:'',
        imgList:[
        ],
        navList:[]
      }
    },
    computed: {
        ...mapState('userInfo',{
          name:state=>state.name,
          figure:state=>state.figure,
          badge:state => state.badge,
          qrCode:state=>state.qrcode,
        }),
        ...mapGetters('userInfo',{
          //products: 'allProducts'
        }),
        badgeClass:function(){
          let _badgeClass='ys-'+this.badge
          return [_badgeClass,]
        }
    },
    methods: {
      ...mapMutations('userInfo',{
        //"addToCart":types.ADD_TO_CART
      }),

      ...mapActions('userInfo',[
      ]),

      editUserInfo:function(){

        this.$router.push({
          path:'userinfo'
        })
      },
      showAlertMsg () {
        this.showAlert=true;
      },
      setImgList(imgList){
        this.imgList=imgList;
      },
      setNavList(navList){
        this.navList=navList;
      },
      checkNavBottom(index){
        let _len=this.navList.length;
        if((_len-index)<=2){
          return true;
        }else{
          return false;
        }
      }
    },
    created () {

      let vm=this;
      vm.$http(
        {
          method: 'post',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          url:  `${baseUrl}banner/getIndexBanner.htm`,
          data:{
          },
        }
      ).then(
        res=>{
          console.log(res)
          if (res.status == 200) {
            if(res.data.code==0){
              var data = res.data.data;
              vm.setImgList(data.banner);
              vm.setNavList(data.navList);
            }else{
              vm.errorMessage=res.data.msg;
              vm.showAlertMsg();
            }
          }

        }
      )//end http;
    }

  }
</script>


<style lang="less" scoped>

  @bgcolor:#fff;

  #user-center{
    padding-top:15px;
    padding-bottom: 50px;
    height: 100%;
    background-color:@bgcolor;
    .center{

        position: relative;
        width:100%;
        height:155px;

        .ys-figure-wrapper{
            position:absolute;
            padding-top:80px;
            height:110px;
            width:110px;
            top:20px;
            left:50%;
            margin-top:0;
            margin-left:-55px;

            .ys-figure{
                position: absolute;
                width:76px;
                height:76px;
                top:0;
                left:50%;
                margin-left:-39px;
              }
            .ys-badge{
                position:absolute;
                top:38px;
                margin-top:-10px;
                right:-10px;
            }

            h3{
              font-weight:200;
              color:#999;
              margin:0;
              line-height:20px;
              font-size:16px;
              text-align: center;
              letter-spacing:.05em;
            }
        }
    }

    .user-links-wrapper{
      padding:66px;
      padding-top:10px;
      .user-cell-wrapper{
        margin-top:0;
        .weui-cell{
          padding:18px 15px;
          border-radius:5px;
          font-size:15px;
        }

      }
    }

  }
</style>

<style lang="less">
  #user-center{

  .user-cell-wrapper{
      &>.weui-cells{
         margin-top: 0;
         margin-bottom: 10px;
         border-radius: 5px;
         box-shadow: 0px 2px 2px rgba(99,99,99,.1);
         font-size: 15px;
          &:before{display: none;}
          &:after{display: none;}
       }
    }
  .weui-grids{
        &:before{
           border-top:0;
         }
        &:after{
          border-left:0;
         }
      }

  .weui-grid{
      height:125px;
      padding:30px 10px;
      &:before{
          top:30px;
          bottom:32px;
          border-right:solid 1px #dbddde;
       }

       &:after{
          border-bottom:solid 1px #dbddde;
        }
      &.no-bottom-line{
          &:after{
            border-bottom: 0;
           }
       }
      &.no-right-line{
          &:before{
             border-right: 0;
           }
      }
      .weui-grid__icon{
        width:36px;
        height:36px;
      }
      .weui-grid__label{
          font-size:12px;
      }
    }

  .weui-grid__icon + .weui-grid__label {
    margin-top: 12px;
  }
  }
</style>

