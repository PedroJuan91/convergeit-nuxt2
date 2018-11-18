<template>
  <v-content>
    <v-layout row>
      <v-flex xs12 sm5 md4 offset-xs4>
        <v-card dark>
          <v-card-title>  <v-layout justify-center><span class="title">Admin View Page</span></v-layout>
          </v-card-title>
          <v-card-text>
            <v-layout justify-center><span class="body-1">This page views all agents transaction <br /><v-layout justify-center> Created with Love</v-layout> </span></v-layout>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center mt-3>
        <v-btn ripple @click="back">Back Home</v-btn>
    </v-layout>
  </v-content>
</template>
<script>
export default {
  layout: 'admin',
  methods: {
    back() {
      this.$router.push('/admin')
    }
  }
}
</script>
