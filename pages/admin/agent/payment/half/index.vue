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
      <datahalf :items="searching"/>
    </v-container>
  </v-content>
</template>
<script>
import datahalf from '@/components/admin/agent/payment/fullview/half'
export default {
  components: {
    datahalf
  },
  data(){
    return {
      searchInput: '',
      label: 'Search Payment Info'
    }
  },
  computed: {
    data(){
      return this.$store.getters['admin/mergehalfPayOrder']
    },
    searching(){
      return this.data.filter((item) => {
        return item.ordnameto.match(this.searchInput)
      })
    }
  },
  layout: 'adminhalfPayment',
  methods: {
    backhome(){
      return this.$router.push('/admin/')
    }
  }
}
</script>
