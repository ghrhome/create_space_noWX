<template>
  <div id="page404">
      <div class="page-wrapper">
        <div class="wrapper">
          <em class="icon-404"></em>
          <p>建设中...</p>
        </div>
      </div>
  </div>
</template>
<script>
  import {Group} from 'vux'

  export default {
    components: {
      Group
    }
  }
</script>

<style lang="less" scoped>
  @img-base-url:'../../static/images';
  #page404{
    background-color:#fff;
    height:100%;
  &>.page-wrapper{
     position: relative;
    height:100%;
    width:100%;
  &>div.wrapper{
     padding-top:150px;
     width:120px;
     height:190px;
     position: absolute;
     top:50%;
     left:50%;
     margin-top:-95px;
     margin-left:-60px;
  em.icon-404{
    display: block;
    position: absolute;
    width:115px;
    height:115px;
    top:0;left:2.5px;
    background-image:url("@{img-base-url}/ys_under_construction@2x.png");
    background-size:contain;
    background-repeat: no-repeat;
    background-position:center top;
  }
  p{font-size:14px; color:#000;text-align: center;line-height: 1.4;margin:0;}
  }
   }

  }
</style>
