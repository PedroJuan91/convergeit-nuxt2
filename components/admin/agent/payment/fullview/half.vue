<template>
  <v-flex>
    <v-card 
      v-for="(item, index) in items" 
      :key="index" 
      class="card">
      <v-list>
        <v-list-group >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ item.ordnameto }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Order Address: </span><span class="black--text">{{ item.address }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Order Email Address: </span><span class="black--text">{{ item.ordsend }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Payer name: </span><span class="black--text">{{ item.payer_dat.payer_info.last_name }}, {{ item.payer_dat.payer_info.first_name }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Payer Email Address: </span><span class="black--text">{{ item.payer_dat.payer_info.email }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Order date: </span><span class="black--text">{{ $dateFilter(item.orddate) }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Half payment date: </span><span class="black--text">{{ $dateFilter(item.paid_timesnap) }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Payment status: </span><span class="black--text">{{ item.modepay }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <halffull 
            v-if="item.modepay === 'full'" 
            :ids="item.orderid" 
            text="black--text" />
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span class="caption">Payment amount: </span><span class="black--text">Php {{ item.paid_item.amount.total }}</span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</template>
<script>
import halffull from '@/components/custom/adminfullhalfpay'
export default {
  components: {
    halffull
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
}
</script>
<style scoped>
  .card {
    display: inline-block;
    display: table;
    float: left;
    margin: 3px;
    width: 250px;
  }
</style>
