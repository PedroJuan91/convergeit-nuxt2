<template>
  <v-content>
    <v-layout
      row,
      justify-center
      wrap>
      <v-card>
        <v-flex>
          <v-img
            :src="clientProf.cltimg"
            :alt="clientProf.cltname"
            height="300"
            width="350">
            <v-layout
              row
              fill-height
              column>
              <v-card-title>
                <nuxt-link to="/agents">
                  <v-avatar>
                    <v-icon
                      large
                      color="blue-grey darken-3">arrow_back</v-icon>
                  </v-avatar>
                </nuxt-link>
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
              <v-card-title class="white--text pl-5 pt-5">
                <span class="font-weight-bold display-1 pl-5 pt-5">{{ clientProf.cltname }}</span>
              </v-card-title>
            </v-layout>
          </v-img>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>home</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{ clientProf.cltaddress }}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>contact_phone</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{ clientProf.cltphone }}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>email</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{ clientProf.cltemail }}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>today</v-icon></v-list-tile-avatar>
              <v-list-tile-content>
                <span class="font-weight-regular">{{ $dateFilter(clientProf.cltdate) }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-card>
    </v-layout>
    <v-layout
      row
      align-center
      justify-center
      wrap
      mt-4>
      <v-flex
        xs12
        sm7
        md4
        mb-3>
        <v-toolbar>
          <v-toolbar-title>
            Client's Order
          </v-toolbar-title>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout
      row
      align-center
      justify-center
      wrap>
      <v-flex
        xs12
        sm5
        md3>
        <data-list
          :data="dataRule"/>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import dataList from '@/components/reports/perCltOrder'
import {mapGetters} from 'vuex'
export default {
  layout: 'agentCustomer',
  components: {
    dataList
  },
  computed: {
    clientProf(){
      return this.$store.getters.profileClient(this.$route.params.id)
    },
    ...mapGetters({
      dataRule: 'report/filterdate'
    })

  },
  created() {
    //do something before mounting vue instance
    this.$store.dispatch('loadClt', this.$route.params.id)
      .catch(e => {
        if(e.code == 408){
          this.text = e.message
          this.snackbar = true
        }else {
          this.text = e.message
          this.snackbar= true
        }
        this.$router.push('/public/vendor.bundle.00f8a7a6911fb6e55d16.js')
        })
  },
  methods: {
    editMe(val){
      return this.$router.push('/agents/customer/edit/' + val)
    }
  },

}
</script>
