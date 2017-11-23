<template>
  <div id="user-qrcode">
    <div class="center">

      <div class="ys-figure-wrapper ">
        <em class="ys-figure ys-figure-lg" v-bind:style="{backgroundImage:'url('+figure+')'}"></em>
        <!--<span class="ys-badge" v-bind:class="badgeClass"></span>-->
        <h3 class="ys-figure-name">{{name}}</h3>
      </div>

    </div>
   <!-- <div class="user-qrcode-wrapper">
      <qrcode :value="qrCode" type="img" :size="100"></qrcode>

    </div>-->
   <!--<div style="width:300px;height:300px;" v-bind:style="{backgroundImage:'url('+getQrCode+')'}"></div>-->
    <img :src="qrCode" class="user-qrcode"/>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  import { Group, Cell,Qrcode,XImg } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      Qrcode,
      XImg
    },
    computed: {
      ...mapState('userInfo',{
        name:state=>state.name,
        figure:state=>state.figure,
        badge:state => state.badge,
        qrCode:state=>state.qrcode
      }),
      ...mapGetters('userInfo',{
        //products: 'allProducts'
        getQrCode:'getQrCode'
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
      ])
    },
    created () {
    }

  }
</script>

<style lang="less" scoped>

  @bgcolor:#fff;

  #user-qrcode{
    padding-bottom: 50px;
    height: 100%;
    background-color:@bgcolor;
    .center{
      background-color:#fff;
      position: relative;
      width:100%;
      height:139px;

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
          font-size:18px;
          text-align: center;
          letter-spacing:.05em;
        }
      }
      }
  .user-qrcode-wrapper{padding:20px;text-align: center;}
  .user-qrcode{width:200px;margin:0 auto;display: block;}
  }
</style>
