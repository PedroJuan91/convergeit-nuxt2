<template>
  <v-content>
    <v-layout 
      row 
      justify-center>
      <v-flex 
        xs12 
        sm6 >
        <v-card>
          <v-card-title><span class="headline font-weight-bold">Edit Client</span>
            <v-spacer />
            <v-btn 
              icon 
              flat 
              @click="returnhome($route.params.id)"> <v-icon large>arrow_back</v-icon></v-btn>
          </v-card-title>
          <edited :data="clientProf" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import edited from '@/components/custom/edit/client'
  export default {
    layout: 'agentCustomer',
    components: {
      edited
    },
    computed: {
      clientProf(){
        return this.$store.getters.profileClient(this.$route.params.id)
      }
    },
    methods: {
      returnhome(val){
        return this.$router.push('/agents/customer/' + val)
      }
    }
  }
</script>
