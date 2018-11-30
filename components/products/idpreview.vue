<template>
  <v-layout>
    <v-flex xs12>
      <v-card
        v-for="(item, index) in items" 
        :key="index"
        class="card"
        ripple
        @click.native="loadDetail(item.id)">
        <v-img 
          :src="item.prodimg" 
          height="300"
          width="320"
        />
        <v-card-title>
          <h1>{{ item.prodname }}</h1>
        </v-card-title>
        <v-flex 
          xs12 
          offset-xs1>
          <v-card-text>
            Price:<span class="titile font-weight-medium"> Php {{ item.prodprice }}.00</span>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    middleware: 'authenticated',
    name: 'Idpreview',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      })
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
