<template>
  <v-content>
    <v-layout row mb-3>
      <v-flex xs12 sm4 md4 mr-2>
        <v-select
        solo-inverted
        label="Clients name"
        :items="clientName"
        item-text="cltname"
        item-value="id"
        return-object
        v-model="clientOrder"
        single-line>
        </v-select>
      </v-flex>
      <v-spacer />
      <v-btn flat :disabled="rules" ripple @click="onsubmit">Checkout<v-icon x-large>assignment_turned_in</v-icon></v-btn>

    </v-layout>

        <v-img v-if='$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='clientOrder.cltimg'></v-img>
        <v-layout v-if="!rules">
          <v-flex>
            <v-img v-if='!$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='clientOrder.cltimg'></v-img>
          </v-flex>
          <v-flex mx-2 xs12 sm8 md8 >
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon large>person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{clientOrder.cltname}}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon large>location_on</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{clientOrder.cltaddress}}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon large>email</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{clientOrder.cltemail}}</v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-flex mt-2>
              <v-list>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <v-icon>payments</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <span>Php {{total}}.00</span>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-flex>
        </v-layout>
    <v-layout row v-if="items >= 1">
      <v-flex>
        <v-layout fill-height>
          <v-layout justify-center align-center>
            <span class="display-1 font-weight-black">Ordered Products</span>
          </v-layout>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
        <v-layout justify-end>
          <v-text-field outline :label='label'  v-model='searchInput'></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
      <v-flex v-if="items >= 1">
        <checkoutCounter :data='itemlist'
         />
      </v-flex>
      <v-flex v-else mt-5>
        <v-layout justify-center>
          <h2>No Product Orders yet. Please click products at on shop menu</h2>
        </v-layout>
      </v-flex>
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
  </v-content>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import drawerEnter from '@/components/create/order/customerDetail'
import checkoutCounter from '@/components/create/order/checkoutList'
export default {
  layout: 'order',
  components: {
    drawerEnter,
    checkoutCounter
  },
  computed: {
    ...mapGetters('order', {
      items: 'checkoutLists',
      clientName: 'clientsOfAgent',
      listedprod: 'myShopping',
      itemlist: 'viewCheckoutList',


    }),
    ...mapState({
      user: 'user'
    }),
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    },
    rules(){
      for(let k in this.clientOrder){
        if(this.clientOrder.hasOwnProperty(k)){
          return false
        }
      }
      return true
    },
    total(){
      return this.itemlist.reduce((total, p) => {
        return total + p.prodprice * p.itemquantity
      }, 0)
    }

  },
  data(){
    return {
      label:'Search ordered product',
      clientOrder: {},
      timeout: 6000,
      text: '',
      snackbar: false,
      date: new Date(),
      time: new Date(),
      totalAmount: 0
    }
  },
  methods: {
    onsubmit(thecart){
      const products = []
      const date = new Date()
      for(let i in this.listedprod){
        products.push({...this.listedprod[i]})
      }
      const order = {
        cltimg: this.clientOrder.cltimg,
        cltid: this.clientOrder.id,
        ordnameto: this.clientOrder.cltname,
        ordsend: this.clientOrder.cltemail,
        address: this.clientOrder.cltaddress,
        itemstotal: this.total,
        ordprodlist: products,
        orddate: this.submittableDateTime.toISOString()
      }
      this.$store.dispatch('order/saveOrder', order)
      .then(() => this.$router.push('/agents'))
      .catch(e => {
        this.text = e.message
        this.snackbar = true
      })
    }
  }
}
</script>
