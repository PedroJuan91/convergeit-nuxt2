<template>
  <v-layout>
    <v-flex xs12 >
      <v-card
        v-for="(item, index) in items" 
        :key="index"
        class="card"
        ripple
        @click.native="loadDetail(item.id)">
        <v-card-title>
          <h1>{{ item.cltname }}</h1>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <h4>Address: {{ item.cltaddress }}</h4> <br >
            <h4>Email: {{ item.cltemail }}</h4>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'Idpreview',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      loadDetail(id) {
        return this.$router.push('/agents/customer/' + id)
      }
    }
  }
</script>
<style scoped>
  .card {
    width: 250px;
    height: 230px;
    display: inline-block;
    display: table;
    float: left;
    margin: 10px;
  }
</style>
