<template>
  <v-list-tile >
    <v-list-tile-content>
      <v-list-tile-sub-title><span class="caption">Full payment date: </span><span :class="text">{{ $dateFilter(time) }}</span></v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
<script>
export default{
  props: {
    ids: {
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true
    }
  },
  computed: {
    time(){
      return this.$store.getters.adminhalfpay(this.ids)
    }
  }
}
</script>
