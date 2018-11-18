<template>
    <v-content >
    <v-card class="card" v-for='(item, index) in data' :key='index'
    ripple
    @click.native='addtocart(item.id, item.prodprice, item.proddesc, item.prodname)'>
          <v-img height='300' width='320'
          :src="item.prodimg">
          </v-img>
        <v-card-title>
          <h2>{{item.prodname}}</h2>
        </v-card-title>
    </v-card>
  </v-content>
</template>
<script>
  export default {
    props: ['data'],
    methods: {
      addtocart(id, price, desc, name) {
        return this.$store.dispatch('order/editcart', {id: id, prodprice: price, proddesc: desc, prodname: name})
      }
    }

  }
</script>
<style scoped>
  .card {
    width: 270px;
    height: 230px;
    display: inline-block;
    display: table;
    float: left;
    margin: 10px;
  }
</style>
