<template>
  <v-content>
    <v-container fluid>
      <v-layout
        row
        solid>
        <v-flex
          xs12
          sm7
          md7>
          <v-toolbar dark>
            <v-toolbar-title>Clients</v-toolbar-title>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-flex
          v-if="clients < 1"
          my-4
          xs12
          md3
          offset-xs2>
          <h2>You have no Clients yet</h2>
        </v-flex>
        <v-flex
          v-else
          xs12
          sm7
          md6>
          <client-dash
            :items="listedClient"
          />
        </v-flex>
      </v-layout>

      <v-flex>
        <v-spacer/>
        <v-btn
          :disabled="clients < 1"
          to="/agents/customer">
          All Clients list
        </v-btn>
      </v-flex>
    </v-container>

    <v-container>
      <v-layout
        row
        solid>
        <v-flex
          xs12
          sm7
          md7>
          <v-toolbar dark>
            <v-toolbar-title>Orders</v-toolbar-title>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-flex
        v-if="order < 1"
        my-4
        xs12
        md5
        offset-xs2>
        <h2>You have not order for the client</h2>
      </v-flex>
      <order-dash
        v-else
        :items="listedOrder"
      />
      <v-flex>
        <v-spacer/>
        <v-btn
          :disabled="order < 1"
          to="/agents/orders">
          All Order list
        </v-btn>
      </v-flex>
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
    </v-container>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import clientDash from '@/components/agent/dashboardClient'
import orderDash from '@/components/agent/dashboardOrder'
import mssgbrd from '@/components/agent/mssg-brd-plate'
export default {
  components: {
    clientDash,
    orderDash,
    mssgbrd
  },
  data() {
    return {
      timeout: 6000,
      snackbar: false,
      text: ''
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    }),
    ...mapGetters('render',{
      clients: 'listedClient',
      order: 'listedOrder',
      listedClient: 'featuredClients',
      listedOrder: 'featuredOrder'
    })
  },
  created() {
    //do something before mounting vue instance
    this.$store.dispatch('theLoaders')
      .catch(e => {
        if(e.code == 408){
          this.text = e.message
          this.snackbar = true
        }else {
          this.text = e.message
          this.snackbar= true
        }
        this.$router.push('/public/vendor.bundle.00f8a7a6911fb6e55d16.js')
        })
  },
  layout: 'agent',
}
</script>
