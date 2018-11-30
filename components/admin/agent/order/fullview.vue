<template>
  <v-flex >
    <v-card 
      v-for="(item, index) in items" 
      :key="index" 
      class="card">
      <v-list>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-card-title>{{ item.ordnameto }}</v-card-title>
          </v-list-tile>
          <v-card-text>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Order Address: </span> <span class="black--text">{{ item.address }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Confirmed Quotation: </span> <span class="black--text">{{ statement(item.confirmquotation) }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Order Paid: </span> <span class="black--text">{{ statement(item.hasPaid) }}</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title><span class="caption">Order Total: </span> <span class="black--text">Php  {{ item.itemstotal }}.00</span></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-text>
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
      statement(val){
        if(val){
          return 'Yes'
        }else{
          return 'No'
        }
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
    width: 300px;
  }
</style>
