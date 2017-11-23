<template>
  <div id="user-center">
    <div class="center">

      <div class="ys-figure-wrapper">
        <em class="ys-figure ys-figure-lg" v-bind:style="{backgroundImage:'url('+figure+')'}"  @click="editUserInfo"></em>

        <span class="ys-badge" v-bind:class="badgeClass"></span>

        <h3 class="ys-figure-name">{{name}}</h3>
      </div>

    </div>
    <div class="user-links-wrapper">

      <group class="user-cell-wrapper">
        <cell is-link title="我的会员卡" link="/cardDetail">
          <em class="ys-icon ys-icon-ticket" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="我的二维码" link="userqrcode">
          <em class="ys-icon ys-icon-qrcode" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="订单列表" link="/art_shop/order_list">
          <em class="ys-icon ys-icon-list" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="我的礼券" link="/coupon">
          <em class="ys-icon ys-icon-coupon" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="我的活动" link="/exhibition/my_exhibition_activity_list">
          <em class="ys-icon ys-icon-activity" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="购物车" link="/art_shop/shopping_cart">
          <em class="ys-icon ys-icon-cart" slot="icon"></em>
        </cell>
      </group>

      <group class="user-cell-wrapper">
        <cell is-link title="会员权益" link="404">
          <em class="ys-icon ys-icon-badge" slot="icon"></em>
        </cell>
      </group>

    </div>

  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  import { Group, Cell } from 'vux'
  export default {
    components: {
      Group,
      Cell
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
        console.log("......");
        this.$router.push({
          path:'userinfo'
        })
      },
    },
    created () {
    }

  }
</script>


<style lang="less" scoped>

  @bgcolor:#f0f4f7;

  #user-center{
    padding-bottom: 50px;
    height: 100%;
    background-color:@bgcolor;
    .center{
        background-color:#fff;
        position: relative;
        width:100%;
        height:140px;

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
      padding:15px;

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
  }
</style>

