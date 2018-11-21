<template>
    <v-flex >
      <v-card class="card" v-for="(item, index) in data" :key="index">
        <v-img :src='item.prodimg' height='300' width='320'>
          <v-layout fill-height column>
            <v-card-title>
              <v-spacer />
              <v-btn flat icon @click="removeProd(index)"><v-icon>close</v-icon></v-btn>
            </v-card-title>
            <v-spacer />
            <v-card-title class="black--text pl-5 pt-5">
              <span class="font-weight-bold subheading pt-5">{{item.prodname}}</span>
            </v-card-title>
          </v-layout>
        </v-img>
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>payment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title>Price: Php {{item.prodprice}}.00</v-list-tile-sub-title>
              <v-list-tile-title>Php {{item.prodprice * item.itemquantity}}.00</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon> shopping_cart</v-icon>
            </v-list-tile-avatar>
            <v-spacer />
              <v-list-tile-title> <span class="title">{{item.itemquantity}}</span></v-list-tile-title>
            <v-list-tile-action>
              <v-btn flat icon @click="incrementVal(item.id)"><v-icon>add</v-icon></v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn flat icon :disabled="item.itemquantity <= 1" @click="decrementVal(item.id)" ><v-icon>remove</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-title><span class="black--text">Item Description</span> </v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-for='(items, index) in item.proddesc' :key="index">
              <v-list-tile-sub-title>{{items.text}}</v-list-tile-sub-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        top
      >
        {{ text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-flex>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data(){
      return {
        timeout: 6000,
        snackbar: false,
        text: ''
      }
    },
    computed: {
      ...mapGetters('order',{
        items: 'editviewCheckoutList',
        increment: 'incrementValue'
      })
    },
    methods: {
      incrementVal(id) {
        this.$store.dispatch('order/editinvermentValue', id)
        .catch(e => {
          this.text = e.message
          this.snackbar = true
        })
      },
      decrementVal(id) {
        this.$store.dispatch('order/editdecrementValue', id)
        .catch(e => {
          this.text = e.message
          this.snackbar = true
        })
      },
      removeProd(index) {
        this.$store.dispatch('order/editremoveProd', index)
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
