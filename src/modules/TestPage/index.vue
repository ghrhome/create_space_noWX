<template>
  <div>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }}
        <br>
        <button
          :disabled="!p.inventory"
          @click="addToCart(p)">
          Add to cart
        </button>
      </li>
    </ul>
    <tab-component message="testmessage"></tab-component>

    <swiper :imgList="imgList">
     <!-- <div slot='swiper-slide' class="swiper-slide" slot-scope="props">

      </div>-->
    </swiper>
  </div>

</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  import TabComponent from '../../components/tab.vue'
  import Swiper from '../../components/swiper.vue'

  export default {
    components:{
      TabComponent,
      Swiper
    },
    data () {
      return {
        imgList:[
          {
            'src':'./static/assets/1.jpg',
            'link':'1'
          },{
            'src':'./static/assets/2.jpg',
            'link':'2'
          },{
            'src':'./static/assets/3.jpg',
            'link':'3'
          }
        ]
      }
    },
    computed: {
      ...mapState('testPage',{
        all:state => state.all,
        name:state=>state.name
      }),
      ...mapGetters('testPage',{
        products: 'allProducts'
      }),

      total () {
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity
        }, 0)
      }
    },
    methods: {
      ...mapMutations('testPage',{
        "addToCart":types.ADD_TO_CART
      }),

      ...mapActions('testPage',[
        'getAllProducts',
      ])
    },
    created () {
      this.$store.dispatch('testPage/getAllProducts')
      //this.getAllProducts();
    }
  }
</script>
