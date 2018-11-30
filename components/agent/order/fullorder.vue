<template>
  <v-content>
    <v-card 
      v-for="(item, index) in items" 
      :key="index" 
      class="card"
      ripple
      @click.native="getID(item.id)">
      <v-card-title>
        <h2>{{ item.ordnameto }} </h2>
      </v-card-title>
      <v-card-text>
        <span class="caption grey--text">Order Date:</span> <span class="subheading"> {{ $dateFilter(item.ordertime) }}</span> <br>
        <span class="caption grey--text">Quotation confired:</span> <span class="subheading">{{ confirmation(item.confirmquotation) }}</span> <br>
        <span class="caption grey--text">Client paid:</span> <span class="subheading">{{ confirmation(item.hasPaid) }}</span><br>
        <span class="caption grey--text">Order total price tag:</span> <span class="subheading">Php {{ item.itemstotal }}.00</span><br>
      </v-card-text>
    </v-card>
  </v-content>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    confirmation(confirm){
      if(confirm){
        return "Yes"
      }else{
        return "No"
      }
    },
    getID(id){
      return this.$router.push('/agents/orders/' + id)
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
