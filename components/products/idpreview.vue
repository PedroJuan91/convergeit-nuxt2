<template>
  <v-layout>
    <v-flex xs12>
      <v-card
      v-for="(item, index) in items" :key="index"
      class="card"
      ripple
      @click.native="loadDetail(item.id)">
      <v-img height='300' width='320'
        :src="item.prodimg"
      ></v-img>
        <v-card-title>
          <h1>{{item.prodname}}</h1>
        </v-card-title>
        <v-flex xs12 offset-xs1>
          <v-card-text>
            Price:<span class="titile font-weight-medium"> Php {{item.prodprice}}.00</span>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    middleware: 'authenticated',
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      })
    },
    name: 'idpreview',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      loadDetail(id) {
        return this.$router.push('/agents/products/' + id)
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
