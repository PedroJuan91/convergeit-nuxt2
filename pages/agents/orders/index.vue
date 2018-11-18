<template>
  <v-content>
    <v-container >
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
      <order-card
        :items="searching"
      ></order-card>
    </v-container>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import orderCard from '@/components/agent/order/fullorder'
export default {
  layout: 'orderview',
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
  components: {
    orderCard
  },
  data(){
    return {
      label: 'Search for orders',
      searchInput: ''
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/agents/')
    }
  }
}
</script>
