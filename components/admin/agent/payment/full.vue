<template>
  <v-flex>
    <v-list-group 
      v-for="(item, index) in items" 
      :key="index">
      <v-list-tile slot="activator">
        <v-list-tile-title>{{ item.ordnameto }}</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Order Physical Address: </span><span class="black--text">{{ item.address }}</span> </v-list-tile-sub-title>
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
          <v-list-tile-sub-title><span class="caption">Payment date: </span><span class="black--text">{{ $dateFilter(item.paid_timesnap) }}</span> </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title><span class="caption">Payment amount: </span><span class="black--text">Php {{ item.paid_item.amount.total }}</span> </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-flex>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
