<template>
  <v-content>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-btn @click="backhome" icon flat><v-icon large>keyboard_backspace</v-icon></v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
        <v-layout justify-end>
          <v-text-field outline :label='label'  v-model='searchInput'></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout justify-center v-if="itemslen < 1">
      <span class="display-2">No payments made in half</span>
    </v-layout>
    <fullpay :items='searching' v-else />
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
  data(){
    return {
      label: 'Search for Half Payments',
      searchInput: ''
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/agents/projects')
    }
  }
}
</script>
