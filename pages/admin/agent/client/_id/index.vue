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
    <v-flex>
      <listClient :items='searching' />
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
import listClient from '@/components/admin/agent/client'
import {mapState} from 'vuex'
import firebase from 'firebase'
export default {
  async asyncData({store, params, route}){
    store.dispatch('admin/loaddetailclient', params.id)

  },
  layout: 'adminClient',
  computed: {
    data(){
      return this.$store.state.admin.clientdetail
    },
    searching(){
      return this.data.filter((item) => {
        return item.cltname.match(this.searchInput)
      })
    }
  },
  data(){
    return{
      timeout: 6000,
      text: '',
      snackbar: false,
      searchInput: '',
      label: 'Search Client Info'
    }
  },
  components: {
    listClient
  },
  methods: {
    backhome(){
      return this.$router.push('/admin/')
    }
  }
}
</script>
