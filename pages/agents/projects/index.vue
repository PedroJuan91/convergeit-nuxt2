<template>
  <v-content>
    <v-layout>
      <v-btn 
        icon 
        @click="returnHome"><v-icon large>keyboard_backspace</v-icon></v-btn>
    </v-layout>
    <v-layout>
      <v-flex 
        xs12 
        sm5 
        md5 
        lg6 
        mx-1>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Approve Quotation </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items> <v-btn 
              flat 
              to="/agents/projects/quotate">View All</v-btn></v-toolbar-items>
          </v-toolbar>
          <v-card-title v-if="lenquotate < 1">
            <span class="headline" >No client confirm quotation</span>
          </v-card-title>
          <v-flex v-else>
            <quotate />
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex 
        v-if="!$vuetify.breakpoint.xsOnly" 
        xs12 
        sm5 
        md5 
        lg6 
        mx-1>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Payments Lists</v-toolbar-title>
          </v-toolbar>
          <v-flex>
            <payment />
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout 
      v-if="$vuetify.breakpoint.xsOnly" 
      my-3>
      <v-flex 
        xs12 
        sm5 
        md5 
        lg6 
        mx-1>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Payments Lists</v-toolbar-title>
          </v-toolbar>
          <v-flex>
            <payment />
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import quotate from '@/components/agent/projects/quotationinfo'
import payment from '@/components/agent/projects/paymentsinfo'
export default {
  layout: 'agentpayments',
  components: {
    quotate,
    payment
  },
  computed: {
    ...mapGetters({
      lenquotate: 'render/quotationlen'
    })
  },
  methods: {
    returnHome(){
      return this.$router.push('/agents/')
    }
  }
}
</script>
