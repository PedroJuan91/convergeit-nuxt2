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
    </v-container>
    <v-flex>
      <listOrder :items="searching" />
    </v-flex>
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
import listOrder from '@/components/admin/agent/order'
export default {
  async asyncData({store, params, route}){
    store.dispatch('admin/loaddetailorder', params.id)
  },
  layout: 'adminOrders',
  components: {
    listOrder
  },
  data(){
    return{
      timeout: 6000,
      text: '',
      snackbar: false,
      searchInput: '',
      label: 'Search Order Info'
    }
  },
  computed: {
    data(){
      return this.$store.state.admin.orderdetail
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
