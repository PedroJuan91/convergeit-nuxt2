<template>
  <v-layout  row wrap>
    <v-flex xs3 >
      <h1>{{title}}</h1>
    </v-flex>
    <v-flex xs8>
      <v-text-field
      label="Search Product"
      :v-model="textmodel"
      :id="textid">
      </v-text-field>
    </v-flex>

  </v-layout>
</template>
<script>
  export default {
      props: {
          title: {
            type: String,
            required: true
          },
          textmodel: {
            type:String,
            required: true
          },
          textid: {
            type: String,
            required: true
          }
      }
  }
</script>
