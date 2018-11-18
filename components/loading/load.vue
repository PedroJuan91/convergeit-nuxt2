<template>
  <v-app v-if="loading">
    <v-content>
      <v-container >
        <v-layout align-content-center>
          <v-flex mt-10 xs12 sm6 md5 offset-xs1>
            <h1>loading pa siya bess...</h1>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
