<template>
  <v-content>
    <v-container >
      <v-layout>
        <v-flex>
          <v-layout>
            <v-btn 
              icon 
              flat 
              @click="destin"><v-icon large>keyboard_backspace</v-icon></v-btn>
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
      <idpreview
        :items="searching"
      />
    </v-container>
  </v-content>
</template>
<script>
import idpreview from '@/components/agent/customer/idpreview'
import {mapState, mapGetters} from 'vuex'
export default {
  layout: 'agentCustomer',
  components: {
    idpreview
  },
  data(){
    return {
      searchInput: '',
      label: 'Search for Client'
    }
  },
  computed: {
    ...mapGetters('render', {
      listings: 'clientCopy'
    }),
    searching(){
      return this.listings.filter((item) => {
        return item.cltname.match(this.searchInput)
      })
    }

  },
  methods: {
    destin(){
      return this.$router.push('/agents/')
    }
  }
}
</script>
