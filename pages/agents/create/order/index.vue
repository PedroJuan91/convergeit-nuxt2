<template>
  <v-content fluid>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-btn flat icon @click='returnHome'><v-icon>keyboard_backspace</v-icon></v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
        <v-layout justify-end>
          <v-text-field outline :label='label'  v-model='searchInput'></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
      <productPrev :data='searching'
      ></productPrev>
  </v-content>
</template>
<script>

import productPrev from '@/components/products/orderpreview'
import topper from '@/components/create/order/topper'

import {mapGetters, mapState} from 'vuex'
export default {
  layout: 'order',
  components: {
    productPrev,
    topper
  },
  data() {
    return {
      label:'Search for Product',
      searchInput:'',
      orderSearch: '',
      productlistings: [],
      listed: 0,
      orderCheckout: [],
      counter: 0
    }
  },
  computed: {
    ...mapGetters('product', {
      itemd: 'listedProducts'
    }),
    ...mapState({
      user: 'user'
    }),
    searching(){
      return this.itemd.filter((item) => {
        return item.prodname.match(this.searchInput)
      })
    }

  },
  methods: {
    returnHome(){
      return this.$router.push('/agents/')
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
