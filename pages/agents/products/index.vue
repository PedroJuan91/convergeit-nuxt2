<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex>
          <v-layout>
            <v-btn 
              icon 
              @click="returnhome"><v-icon large>keyboard_backspace</v-icon></v-btn>
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
      <section>
        <v-layout wrap>
          <v-flex xs12 >
            <productPrev
              :items="searching"
            />
          </v-flex>
        </v-layout>
      </section>
    </v-container>
  </v-content>
</template>
  <script>
  import {mapState, mapGetters} from 'vuex'
  import productPrev from '@/components/products/idpreview'
export default {
  layout: 'agentproducts',
  components: {
    productPrev
  },
  data(){
    return {
      label: 'Search for Products',
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters('product', {
      items: 'listedProducts'
    }),
    searching(){
      return this.items.filter((item) => {
        return item.prodname.match(this.searchInput)
      })
    }
  },
  methods: {
    returnhome(){
      return this.$router.push('/agents/')
    }
  }
}
</script>
