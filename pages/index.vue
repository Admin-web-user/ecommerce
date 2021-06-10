<template>
  <div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(link,i) in 5"
        :key="i"
        :src="img_src[i] ? img_src[i] : ''"
        :aspect-ratio="16/9"
      />
    </v-carousel>

    <div>
      <h2 :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="ma-1 px-2">
        Newest
      </h2>
      <div class="products d-grid">
        <div v-for="product in products" :key="product.id" :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="ma-1 mb-2 pb-2">
          <div class="img text-center">
            <img :src="product.imgURL" :alt="product.name">
          </div>
          <h3 :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="title product-name px-2">
            {{ product.name }}
          </h3>
          <hr>
          <span class="pa-2 ma-2 mt-1"><strong>{{ `${product.price['currency']}. ${product.price['number']}` }}</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      img_src: [
        'https://admin-web-user.github.io/site-data/images/carousel%20img%200.png',
        'https://admin-web-user.github.io/site-data/images/carousel%20img%201.jpeg',
        'https://admin-web-user.github.io/site-data/images/carousel%20img%202.jpeg',
        'https://admin-web-user.github.io/site-data/images/carousel%20img%203.jpeg',
        'https://admin-web-user.github.io/site-data/images/carousel%20img%204.jpg',
        'https://admin-web-user.github.io/site-data/images/carousel%20img%205.jpg'
      ]
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapState('darkmode', ['mode'])
  },
  watch: {
    products () {
      console.log(this.products)
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.img img{
  max-height: 300px;
}
  .products {
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}
.product-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}
@media (max-width: 700px) {
  .v-carousel{
    height: 250px!important;
  }
}
</style>
