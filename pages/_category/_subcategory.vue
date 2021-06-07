<template>
  <div>
    <h1 class=" text-uppercase text-center pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      {{ `${$route.params.category}/${$route.params.subcategory}` }}
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('darkmode', ['mode'])
  }
}
</script>
