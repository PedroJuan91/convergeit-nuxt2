<template>
  <v-content>
    <v-container >
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
      <order-card
        :items="searching"
      />
    </v-container>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import orderCard from '@/components/agent/order/fullorder'
export default {
  layout: 'orderview',
  components: {
    orderCard
  },
  data(){
    return {
      label: 'Search for orders',
      searchInput: ''
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    }),
    ...mapGetters({
      theItem: 'render/orderfullCopy'
    }),
    searching(){
      return this.theItem.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/agents/')
    }
  }
}
</script>
