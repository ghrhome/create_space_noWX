<template>
  <div id="agreement">
      <div>
        <h3>用户协议</h3>
        <p>....</p>
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
  #agreement{
    background-color:#fff;
    height:100%;
    &>div{
       padding:16px;
     }
    h3{
      text-align: center;
    }
    p{
      font-size:14px;
    }
  }
</style>
