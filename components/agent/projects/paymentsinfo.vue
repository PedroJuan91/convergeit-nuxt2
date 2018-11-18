<template>
  <v-flex>
  <v-flex>
    <v-list >
      <v-subheader >Paid in Full Payment <v-btn to='/agents/projects/payments/full' flat ripple> <span class="grey--text">View all full payments</span></v-btn></v-subheader>
      <v-list-tile v-if="lenfullpay < 1">
        <v-list-tile-title ><span class="body-1">No client paid in full</span> </v-list-tile-title>
      </v-list-tile>
      <v-list-group v-else v-for='(item, index) in payments' :key="index">
        <v-list-tile slot='activator'>
          <v-list-tile-title><span class="subheading">{{item.ordnameto}}</span></v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer name: </span><span class="black--text">{{item.paid_item.item_list.shipping_address.recipient_name}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer address: </span><span class="black--text">{{item.paid_item.item_list.shipping_address.line1}}., {{item.paid_item.item_list.shipping_address.city}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer country: </span><span class="black--text">{{item.paid_item.item_list.shipping_address.country_code}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Amount paid: </span><span class="black--text">Php {{item.itemstotal}}.00</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Order date: </span><span class="black--text">{{$dateFilter(item.orddate)}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payment date: </span><span class="black--text">{{$dateFilter(item.paid_time)}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-flex>
  <v-flex>
    <v-list>
      <v-subheader >Paid in Half Payment <v-btn flat ripple to='/agents/projects/payments/half'> <span class="grey--text">View all half payments</span></v-btn></v-subheader>
      <v-list-tile v-if="lenhalfpay < 1 ">
        <v-list-tile-title ><span class="body-1">No client paid in half</span> </v-list-tile-title>
      </v-list-tile>
      <v-list-group v-else v-for='(items, index) in halfpayments' :key="index">
        <v-list-tile slot='activator'>
          <v-list-tile-title><span class="subheading">{{items.ordnameto}}</span></v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer name: </span><span class="black--text">{{items.paid_item.item_list.shipping_address.recipient_name}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer address: </span><span class="black--text">{{items.paid_item.item_list.shipping_address.line1}}., {{items.paid_item.item_list.shipping_address.city}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payer country: </span><span class="black--text">{{items.paid_item.item_list.shipping_address.country_code}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Total price: </span><span class="black--text">Php {{items.itemstotal}}.00  </span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Amount paid: </span><span class="black--text">Php {{items.paid_item.amount.total}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Paid in full: </span><span class="black--text">{{payment_state(items.paid_other_half)}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Order date: </span><span class="black--text">{{$dateFilter(items.orddate)}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payment date: </span><span class="black--text">{{$dateFilter(items.paid_time)}}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <halfpay v-if='items.paid_other_half' text='black--text' :ids='items.id'/>
      </v-list-group>
    </v-list>
  </v-flex>
</v-flex>
</template>
<script>
import {mapGetters} from 'vuex'
import halfpay from '@/components/custom/fullHalfpay'
  export default {
    layout: 'agent',
    computed: {
      ...mapGetters({
        payments: 'render/featuredfullPayOrder',
        lenfullpay: 'render/fullPayOrderlen',
        lenhalfpay: 'render/halfPayOrderlen',
        halfpayments: 'render/featuredhalfPayOrder'
      })
    },
    methods: {
      payment_state(stat){
        if (stat){
          return 'Yes'
        }else{
          return 'No'
        }
      }
    },
    components: {
      halfpay
    }
  }
</script>
<style scoped>
  .perks{
    height: 400px;
  }
</style>
