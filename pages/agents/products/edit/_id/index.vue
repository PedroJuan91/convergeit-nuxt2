<template>
  <v-content>
    <prodform :data="prodProf" />
  </v-content>
</template>
<script>
import prodform from '@/components/custom/edit/product'
  export default {
    layout: 'agentproducts',
    components: {
      prodform
    },
    computed: {
      prodProf(){
        return this.$store.getters.profileProduct(this.$route.params.id)
      }
    },
  }
</script>
