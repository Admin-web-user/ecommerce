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
  </div>
</template>

<script>
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
  }
}
</script>

<style>
@media (max-width: 700px) {
  .v-carousel{
    height: 250px!important;
  }
}
</style>
