<template>
  <v-app light>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
export default {
  mounted() {
    //do something after mounting vue instance
    setTimeout(() => {this.$nuxt.$loading.finish()}, 3000)
  }
}
</script>
