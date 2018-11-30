<template>
  <v-content>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-btn 
            icon 
            flat 
            @click="backHome"><v-icon large>keyboard_backspace</v-icon></v-btn>
        </v-layout>
      </v-flex>
      <v-flex 
        xs12 
        sm5 
        md5 
        offset-xs0 
        offset-lg2>
        <v-layout justify-end>
          <v-text-field 
            :label="label" 
            v-model="searchInput" 
            outline/>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout 
      v-if="lenpayorder < 1" 
      justify-center>
      <span class="display-2">No List for Full Payments</span>
    </v-layout>
    <fullpay 
      v-else 
      :items="searching" />
  </v-content>
</template>
<script>
import fullpay from '@/components/agent/projects/fullpayinfo'
import {mapGetters} from 'vuex'
export default {
  components: {
    fullpay
  },
  layout: 'agentpayments',
  data(){
    return {
      label: 'Search in Full Payments',
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      payorder: 'render/fullPayOrder',
      lenpayorder: 'render/fullPayOrderlen'
    }),
     searching(){
      return this.payorder.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
     }
  },
  methods: {
    backHome(){
      return this.$router.push('/agents/projects')
    }
  }
}
</script>
