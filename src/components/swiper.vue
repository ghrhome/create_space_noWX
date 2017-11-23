<style lang="css">
  @import '../static/css/swiper.min.css';
</style>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in imgList">
        <img :src="img.bannerLogoUrl"/>
      </div>
     <!-- <slot name="swiper-slide" class="swiper-slide"
            v-for="img in imgList"
            :imgSrc="img.src"></slot>-->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: 'swiper',
    props: ['imgList'],//[{src:'',link:''}]
    data () {
      return {
        msg: 'Swiper Component'
      }
    },

    mounted: function(){
        this.$nextTick(function(){
          //swiper init
          console.log("mounted-----");
          let _container=this.$el;
          let _swiper=new Swiper(_container,{
            autoplay:3000,
            speed:1000,
            autoplayDisableOnInteraction : false,
            loop:true,
            centeredSlides : true,
            slidesPerView:1.4,
            pagination :  {
              el: '.swiper-pagination',
              type: 'bullets',
            },
            onInit:function(swiper){
              swiper.slides[0].className="swiper-slide swiper-slide-active";//第一次打开不要动画
            },
          })
        })
    },
    updated: function(){
      let vm=this;
      let _swiper= vm.$el.swiper;
      _swiper.destroy();

      vm.$nextTick(function(){
        console.log("update-----")

        let _container=vm.$el;
         _swiper=new Swiper(_container,{
          autoplay:3000,
          speed:1000,
          autoplayDisableOnInteraction : false,
          loop:true,
          centeredSlides : true,
          slidesPerView:1.4,
          pagination :  {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          onInit:function(swiper){
            swiper.slides[0].className="swiper-slide swiper-slide-active";//第一次打开不要动画
          },
        })
       // _swiper.updateSlides();

      })
    },
    beforeDestroy: function(){
      this.$nextTick(function(){
        console.log("destroy---------")

        var _swiper=this.$el.swiper
        _swiper.destroy()

      })
    }

  }
</script>

<style>
  .swiper-container {
    width: 100%;
    margin:0;
    height:155px;
    padding-bottom:20px;
  }
  .swiper-slide {
    height:130px;
    overflow:hidden;
    border-radius:5px;
    -webkit-transition: transform 1.0s;
    -moz-transition: transform 1.0s;
    -ms-transition: transform 1.0s;
    -o-transition: transform 1.0s;
    -webkit-transform: scale(0.86);
    transform: scale(0.86);
  }
  .swiper-slide img{width:100%;}
  .swiper-slide-active,.swiper-slide-duplicate-active {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .swiper-container-horizontal>.swiper-pagination-bullets{
      bottom:0;
  }
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
    opacity: 1;
    border:solid 1px #000;

  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #000;
  }

  .none-effect {
    -webkit-transition: none;
    -moz-transition: none;
    -ms-transition: none;
    -o-transition: none;
  }
</style>
