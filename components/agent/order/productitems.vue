<template>
  <v-container>
    <v-layout  mb-3 row wrap  >
      <v-flex>
        <v-card class="card" v-for="(item, index) in parent" :key="index">
        <v-img v-if='$vuetify.breakpoint.xsOnly' width='220' height='200' :src="item.prodimg">
          <v-layout fill-height column>
            <v-spacer />
            <v-card-title class="black--text  pt-5">
              <span class="font-weight-bold caption pt-5">{{item.prodname}}</span>
            </v-card-title>
          </v-layout>
        </v-img>
        <v-img v-else width='320' height='300' :src="item.prodimg">
          <v-layout fill-height column>
            <v-spacer />
            <v-card-title class="black--text pl-5 pt-5">
              <span class="font-weight-bold subheading pt-5">{{item.prodname}}</span>
            </v-card-title>
          </v-layout>
        </v-img>
          <v-list >
            <v-list-group >
              <v-list-tile slot="activator">
                <v-list-tile-title><span class="subheading">Item information</span> </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title><span class="caption">Item Quantity: </span> <span class="black--text">{{item.itemquantity }}</span></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title><span class="caption">Product price: </span> <span class="black--text">Php{{ item.prodprice}}.00</span></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title><span class="caption">Total product price: </span> <span class="black--text">Php{{item.itemquantity * item.prodprice}}.00</span></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile >
                <v-list-tile-action>
                  <v-btn @click="descrip = !descrip">show Product details </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile  v-if="descrip" v-for="itemed in item.proddesc" :key="itemed.text">
                <v-list-tile-content>
                  <ul>
                    <v-list-tile-sub-title><span class="black--text">{{itemed.text}}</span></v-list-tile-sub-title>
                  </ul>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import prodStat from '@/components/agent/order/proddesc'
export default {
  components: {
    prodStat
  },
  props: {
    parent: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      myID:"",
      descrip: false
    }
  },
  computed: {
    stored(){
      return this.prod(this.myID)
    }
  },
  methods: {
    prod(id){
      return this.$store.getters.orderProd(id)
    },
    solve(val1, val2){
      return val1 * val2
    }
  }
}
</script>
<style scoped>
  .card {
    width: 270px;
    height: 230px;
    display: inline-block;
    display: table;
    float: left;
    margin: 10px;
  }
</style>
