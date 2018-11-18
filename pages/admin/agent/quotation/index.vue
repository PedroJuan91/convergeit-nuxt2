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
      <quotate :items='searching' />
    </v-container>
  </v-content>
</template>
<script>
import quotate from '@/components/admin/agent/quotation/full'
export default {
  layout: 'adminQuotation',
  computed: {
    data(){
      return this.$store.getters['admin/confclient']
    },
    searching(){
      return this.data.filter((item) => {
        return item.cltname.match(this.searchInput)
      })
    }
  },
  components: {
    quotate
  },
  data(){
    return {
      searchInput: '',
      label: 'Search Client Info'
    }
  },
  methods: {
    backhome(){
      return this.$router.push('/admin/')
    }
  }
}
</script>
