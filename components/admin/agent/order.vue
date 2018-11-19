<template>
  <v-flex
    xs12
    sm9
    md9
    offset-xs1>
    <v-card
      v-for="(item, index) in items"
      :key="index"
      class="card">
      <v-list>
        <v-list-group>
          <v-list-tile
            slot="activator">
            <v-card-title><span>{{ item.ordnameto }}</span></v-card-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Order Location: </span> <span
                  class="black--text">{{ item.address }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Client Email: </span> <span
                  class="black--text">{{ item.ordsend }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Confirmed Quotation: </span> <span
                  class="black--text">{{ confirmed( item.confirmquotation ) }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Confirmed Payment: </span> <span
                  class="black--text">{{ confirmed( item.hasPaid ) }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-if="item.hasPaid">
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Mode of Payment: </span> <span
                  class="black--text">{{ item.modepay }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Order Date: </span> <span
                  class="black--text">{{ $dateFilter(item.orddate) }}</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title><span
                class="caption grey--text">Total Price: </span> <span
                  class="black--text">Php {{ item.itemstotal }}.00</span></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
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
    confirmed(val){
      if(val){
        return "Yes"
      }else{
        return "No"
      }
    }
  }
}
</script>
<style scoped>
  .card {
    width: 250px;
    display: inline-block;
    display: table;
    float: left;
    margin: 10px;
  }
</style>
