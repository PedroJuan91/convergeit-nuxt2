<template>
  <v-content>
    <v-container>
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
      <v-layout>
        <v-flex 
          xs12 
          sm10 
          md10 
          offset-xs1>
          <orderfull :items="searching" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import orderfull from '@/components/admin/agent/order/fullview'
export default {
  layout: 'adminOrders',
  components: {
    orderfull
  },
  data(){
    return {
      searchInput: '',
      label: 'Search Order Info'
    }
  },
  computed: {
    data(){
      return this.$store.state.admin.orders
    },
    searching(){
      return this.data.filter((item) => {
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
