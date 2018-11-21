<template>
  <v-content>
    <v-layout row>
      <v-tooltip bottom><v-btn slot="activator" @click="back" flat icon><v-icon large>keyboard_backspace</v-icon></v-btn><span>Return Orders</span></v-tooltip>
      <v-spacer />
      <!-- <v-tooltip bottom><v-btn @click="customPay" slot='activator' flat icon><v-icon medium>credit_card</v-icon></v-btn><span>Custom Payments</span></v-tooltip> -->
      <v-tooltip bottom><v-btn @click="emailing(order.ordsend, generatekey)" slot='activator' flat icon><v-icon medium>email</v-icon></v-btn><span>Send Email</span></v-tooltip>
      <v-tooltip bottom><v-btn @click='editMe' slot="activator" :disabled="order.hasPaid" flat icon><v-icon medium>edit</v-icon></v-btn><span>Edit Order</span></v-tooltip>
      <v-dialog v-model="dialog" width="500">
        <v-btn :disabled="order.hasPaid" icon flat slot="activator"><v-icon x-large>close</v-icon></v-btn>
        <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Delete Order
        </v-card-title>

        <v-card-text>
          Confirm on Delete order of <span class="red--text subheading font-weight-bold">{{order.ordnameto}}</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            flat
            @click="removeorder($route.params.id)"
          >
            I accept
          </v-btn>

        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-layout>
    <v-img v-if='$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='order.cltimg'></v-img>
    <v-layout v-if="!rules">
      <v-flex>
        <v-img v-if='!$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='order.cltimg'></v-img>
      </v-flex>
      <v-flex mx-2 xs12 sm8 md8 >
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{order.ordnameto}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>location_on</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{order.address}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>email</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{order.ordsend}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-flex mt-2>
          <v-list>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>payments</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <span>Php {{order.itemstotal}}.00</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex mt-3 xs12 sm4 md4>
        <v-card dark>
          <v-card-title>
            <h2>Order Status</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Order date: </span> <span class="subheading font-weight-bold">{{$dateFilter(order.ordertime)}}</span>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Quotation Confirmed: </span> <span class="subheading font-weight-bold">{{confirm(order.confirmquotation)}}</span>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Client has paid: </span> <span class="subheading font-weight-bold">{{confirm(order.hasPaid)}}</span>
        </v-flex>
      </v-layout>
      <v-layout row v-if='order.hasPaid'>
        <v-flex >
          <span class="body-1 grey--text">Mode of Payment: </span> <span class="subheading font-weight-bold">{{order.modepay}}</span>
        </v-flex>
      </v-layout>

    </v-container>
    <v-container mb-3 row>
        <v-layout>
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
        <productItems
        :parent="searching"
        />

    </v-container>
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
import {mapState, mapGetters} from 'vuex'
import productItems from '@/components/agent/order/productitems'
export default {
  layout: 'orderview',
  components: {
    productItems
  },
  data(){
    return {
        timeout: 6000,
        snackbar: false,
        text: '',
        dialog: false,
        label: 'Search for Products',
        searchInput: ''
    }
  },
  computed: {
    ...mapState({
      user:'user'
    }),
    generatekey(){
      return this.$store.getters.agentKey + this.$route.params.id
    },
    order(){
      return this.$store.getters.profileOrder(this.$route.params.id)
    },
    searching(){
      return this.order.ordprodlist.filter((item) => {
        return item.prodname.match(this.searchInput)
      })
    }
  },
  methods: {
    customPay(){
      return this.$router.push('/agents/orders/custom/payments/' + this.$route.params.id)
    },
    back() {
      return this.$router.push('/agents/orders')
    },
    confirm(conf){
      if (conf){
        return "Yes"
      }else{
        return "No"
      }
    },
    emailing(ordto, key){
      this.$store.dispatch('order/sendemail', {send: ordto, api: key})
      .then(() => {
        this.text = 'successful email send'
        this.snackbar = true
      })
      .catch(e => {
        this.text = e.message
        this.snackbar = true
      })
    },
    removeorder(id){
      this.$store.dispatch('render/removeorder', id)
      .then(() => {
        this.text = 'successful delete order'
        this.snackbar = true
        this.$router.push('/agents/')
      })
    },
    editMe(){
      return this.$router.push('/agents/orders/edit/' + this.$route.params.id)
    }
  }
}
</script>
