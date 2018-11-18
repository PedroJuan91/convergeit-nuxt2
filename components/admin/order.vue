<template>
  <v-layout>
    <v-flex>
      <v-list>
          <v-list-group
            v-for="(item, index) in order"
            :key="index"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.ordnameto }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title> <span class="body-2">Email: </span> {{ item.ordsend }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="body-2">Total value: </span> Php{{ item.itemstotal }}.00</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="body-2">Time Created: </span> {{ $dateFilter(item.ordertime) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-list-tile-action>
                  <v-dialog>
                    <v-btn slot="activator" ripple color="#BBDEFB" class="header"> listed products </v-btn>
                    <v-layout justify-center >
                      <v-card >
                        <v-card-title><span class="title">Products Orderd</span></v-card-title>
                      </v-card>
                    </v-layout>
                    <v-layout >
                      <product-items  :parent="item.ordprodlist" />
                    </v-layout>
                  </v-dialog>
                </v-list-tile-action>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapGetters} from 'vuex'
import productItems from '@/components/agent/order/productitems'
export default {
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    ...mapGetters({
      order: 'admin/featuredagentorder'
    })
  },
  components: {
    productItems
  },
  methods: {
    onscroll(e){
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>
