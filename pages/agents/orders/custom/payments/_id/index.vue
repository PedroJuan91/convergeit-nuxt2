<template>
  <v-content>
    <v-layout>
      <v-tooltip bottom><v-btn @click="returnback" icon flat slot="activator"><v-icon large>keyboard_backspace</v-icon></v-btn> <span>Return to View</span> </v-tooltip>
      <v-spacer />
      <span class="display-1 font-weight-black">Custom Payment</span>
    </v-layout>
  <v-img v-if='$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='datain.cltimg'></v-img>
  <v-layout>
    <v-flex>
      <v-img v-if='!$vuetify.breakpoint.xsOnly' height='300px' width='320px' :src='datain.cltimg'></v-img>
    </v-flex>
    <v-flex mx-2 xs12 sm8 md8 >
      <v-list>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon large>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{datain.ordnameto}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon large>location_on</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{datain.address}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon large>email</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{datain.ordsend}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-flex mt-2>
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>payments</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span>Php {{datain.itemstotal}}.00</span>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-flex>
  </v-layout>
  <v-container>
    <v-layout row>
      <v-flex >
        <span class="body-1 grey--text">Order date: </span> <span class="subheading font-weight-bold">{{$dateFilter(datain.ordertime)}}</span>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex >
        <span class="body-1 grey--text">Quotation Confirmed: </span> <span class="subheading font-weight-bold">{{confirm(datain.confirmquotation)}}</span>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex >
        <span class="body-1 grey--text">Client has paid: </span> <span class="subheading font-weight-bold">{{confirm(datain.hasPaid)}}</span>
      </v-flex>
    </v-layout>
    <v-layout row v-if='datain.hasPaid'>
      <v-flex >
        <span class="body-1 grey--text">Mode of Payment: </span> <span class="subheading font-weight-bold">{{datain.modepay}}</span>
      </v-flex>
    </v-layout>

  </v-container>

  <v-container>
    <v-layout>

    </v-layout>
    <v-tabs>
      <v-layout >
        <v-flex d-flex xs12 order-xs5>
          <v-tab v-for='(n, index) in tabsin' :key='index'>
            {{n.title}}
          </v-tab>
        </v-flex>
      </v-layout>
        <v-tab-item v-for='o in tabsin.length' :key='o'>
          <v-layout v-if='o === 1'>
            <cash-full :cashTotal='datain.itemstotal' />
          </v-layout>
          <v-layout v-if='o === 2'>
            <span>Check Payment</span>
          </v-layout>
          <v-layout v-if='o === 3'>
            <span>other payment option</span>
          </v-layout>
        </v-tab-item>
      </v-tabs>
  </v-container>
  </v-content>
</template>
<script>
import cashFull from '@/components/custom/payments/full/cash'
export default {
  layout: 'orderview',
  data(){
    return {
      tabsin:[
        {title: 'Cash Payment'},
        {title: 'Check Payment'},
        {title: 'Other Payment'}
      ],
    }
  },
  computed: {
    datain(){
      return this.$store.getters.profileOrder(this.$route.params.id)
    }
  },
  methods: {
    confirm(conf){
      if (conf){
        return "Yes"
      }else{
        return "No"
      }
    },
    returnback(){
      return this.$router.push('/agents/orders/' + this.$route.params.id)
    }
  },
  components: {
    cashFull
  }
}
</script>
