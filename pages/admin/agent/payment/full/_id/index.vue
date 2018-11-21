<template>
  <v-content>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-btn icon @click="backhome" flat><v-icon large>keyboard_backspace</v-icon></v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
        <v-layout justify-end>
          <v-text-field outline :label='label'  v-model='searchInput'></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-container>
      <v-flex xs12 sm9 md9>
        <listing :items='searching' />
      </v-flex>
    </v-container>
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
  </v-content>
</template>
<script>
import listing from '@/components/admin/agent/payment/fullview/full'
import {mapGetters} from 'vuex'
export default {
    components: {
      listing
    },
  data(){
    return {
      snackbar: false,
      timeout: 6000,
      text: '',
      searchInput: '',
      label: 'Search Payment Info'
    }
  },
  computed:{
    ...mapGetters({
      list: 'admin/listagentpay'
    }),
    searching(){
      return this.list.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/admin/')
    }
  },
  layout: 'adminPayments',
  async asyncData({store, params, route}){
    store.dispatch('admin/loadfullpaymentorder', params.id)
  },

}
</script>
