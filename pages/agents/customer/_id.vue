<template>
  <v-content>
      <v-layout row wrap justify-center>
        <v-card>
          <v-img height='300' width='350' :src="clientProf.cltimg" :alt="clientProf.cltname">         
            <v-layout row fill-height column>
              <v-card-title>
                <nuxt-link to='/agents'>
                  <v-avatar>
                    <v-icon large color='blue-grey darken-3'>arrow_back</v-icon>
                  </v-avatar>
                </nuxt-link>   
                <v-spacer />
                <v-btn flat @click="editMe($route.params.id)">
                  <v-icon large color="blue-grey darken-3">edit</v-icon>
                </v-btn>
              </v-card-title>   
              <v-spacer />
              <v-card-title class="white--text pl-5 pt-5">
                <span class="font-weight-bold display-1 pl-5 pt-5">{{clientProf.cltname}}</span>
              </v-card-title>         
            </v-layout>
          </v-img>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>home</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{clientProf.cltaddress}}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>contact_phone</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{clientProf.cltphone}}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>email</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{clientProf.cltemail}}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>today</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{$dateFilter(clientProf.cltdate)}}</span>
              </v-list-tile-content>
            </v-list-tile>            
          </v-list>
        </v-card>    
      </v-layout>
  </v-content>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  layout: 'agentCustomer',
  computed: {
    clientProf(){
      return this.$store.getters.profileClient(this.$route.params.id)
    }
  },
  methods: {
    editMe(val){
      return this.$router.push('/agents/customer/edit/' + val)
    }
  }

}
</script>
