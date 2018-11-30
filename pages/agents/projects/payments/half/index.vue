<template>
  <v-content>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-btn 
            icon 
            flat 
            @click="backhome"><v-icon large>keyboard_backspace</v-icon></v-btn>
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
      v-if="itemslen < 1" 
      justify-center>
      <span class="display-2">No payments made in half</span>
    </v-layout>
    <fullpay 
      v-else 
      :items="searching" />
  </v-content>
</template>
<script>
import fullpay from '@/components/agent/projects/halfpayinfo'
import {mapGetters} from 'vuex'
export default {
  layout: 'agentpayments',
  components: {
    fullpay
  },
  data(){
    return {
      label: 'Search for Half Payments',
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      itemslen: 'render/halfPayOrderlen',
      item: 'render/halfPayOrder'
    }),
    searching(){
      return this.item.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/agents/projects')
    }
  }
}
</script>
