<template>
  <v-flex>
    <v-card 
      v-for="(item, index) in items" 
      :key="index" 
      dark 
      class="card" >
      <v-list >
        <v-list-group>
          <v-list-tile slot="activator">
            <v-card-title>
              <span class="title" > {{ item.ordnameto }}</span>
              <v-spacer />
              <v-btn 
                flat 
                @click.native="getID(item.id)"> ordering Details</v-btn>
            </v-card-title>
          </v-list-tile>
          <v-card-content @click.native="getID(item.id)">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Payer name: </span><span class="white--text">{{ item.paid_item.item_list.shipping_address.recipient_name }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Payer address: </span><span class="white--text">{{ item.paid_item.item_list.shipping_address.line1 }}., {{ item.paid_item.item_list.shipping_address.city }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Payer country: </span><span class="white--text">{{ item.paid_item.item_list.shipping_address.country_code }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Amount paid: </span><span class="white--text">Php {{ item.paid_item.amount.total }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Order date: </span><span class="white--text">{{ $dateFilter(item.orddate) }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Payment date: </span><span class="white--text">{{ $dateFilter(item.paid_time) }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-content>
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
      getID(id){
        return this.$router.push('/agents/orders/' + id)
      }
    }
  }
</script>
<style scoped>
  .card {
    display: inline-block;
    display: table;
    float: left;
    margin: 3px;
  }
</style>
