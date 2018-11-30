<template>
  <v-content>
    <v-layout 
      row 
      align-center 
      justify-center 
      solid>
      <v-card>
        <v-img 
          :src="prodProf.prodimg" 
          height="300" 
          width="350" >
          <v-layout 
            fill-height 
            column>
            <v-card-title>
              <v-btn 
                flat 
                @click="returnMe">
                <v-icon 
                  large 
                  color="blue-grey darken-3">arrow_back</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn 
                flat 
                @click="editMe($route.params.id)">
                <v-icon 
                  large 
                  color="blue-grey darken-3">edit</v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer />
            <v-card-title class="black--text pl-5 pt-5">
              <span class="font-weight-bold subheading pl-2 pt-5">{{ prodProf.prodname }}</span>
            </v-card-title>

          </v-layout>
        </v-img>

        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>payment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="body-1">Php {{ prodProf.prodprice }}.00</span>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-title><span class="body-1">Item Description</span></v-list-tile-title>
            </v-list-tile>
            <v-list-tile 
              v-for="(item, index) in prodProf.proddesc" 
              :key="index">
              <v-list-tile-sub-title><span class="black--text"> {{ item.text }}</span></v-list-tile-sub-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-layout>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  layout: 'agentproducts',
  computed: {
    prodProf(){
      return this.$store.getters.profileProduct(this.$route.params.id)
    }
  },
  methods: {
    editMe(val){
      return this.$router.push('/agents/products/edit/' + val)
    },
    returnMe(){
      return this.$router.push('/agents/products')
    }
  }

}
</script>
