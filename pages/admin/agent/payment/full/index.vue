<template>
  <v-content>
    <v-container>
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
    </v-container>
    <v-container >
      <v-flex xs12 sm9 md9>
        <fullview :items='searching' />
      </v-flex>
    </v-container>

  </v-content>
</template>
<script>
import fullview from '@/components/admin/agent/payment/fullview/full'
import {mapGetters} from 'vuex'
export default {
  layout: 'adminPayments',
  components: {
    fullview
  },
  data(){
    return {
      searchInput: '',
      label: 'Search Payment Info'
    }
  },
  computed: {
    ...mapGetters({
      listing: 'admin/mergefullPayOrder'
    }),
    searching(){
      return this.listing.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/admin/')
    }
  }
}
</script>
