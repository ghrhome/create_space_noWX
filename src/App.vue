<template>
  <div style="height:100%;" >

   <!-- <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>-->

    <!-- main content -->
    <view-box ref="viewBox" id="app-view-box">
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </transition>
    </view-box>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>

  </div>
</template>

<script>

  import { Actionsheet, ViewBox,Loading, TransferDom } from 'vux'
  import { mapState,mapGetters,mapActions } from 'vuex'
  import $ from 'jquery'

  export default {
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      Loading,
      Actionsheet
    },
    methods: {

    },

    computed: {

      ...mapState({
        isLoading:state => state.vux.isLoading,
        direction:state=>state.vux.direction
      }),

      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },

    },

    data () {
      return {
      }
    }
  }
</script>

<style lang="less">
  @import './static/css/reset.less';
  @import "./static/css/theme.less";
  @import "./static/css/public.less";
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

</style>
