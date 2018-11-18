<template>
  <v-flex>
    <v-card class="card" v-for='(conf, index) in items' :key="index">
      <v-list>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-title>{{conf.cltname}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="caption grey--text">Agent: </span><span class="body-1">{{conf.agtlname + ', ' + conf.agtfname}}</span> </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="caption grey--text">Project Address: </span><span class="body-1">{{conf.cltaddress}}</span> </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="caption grey--text">Approve time: </span><span class="body-1">{{$dateFilter(conf.approvetime)}}</span> </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="caption grey--text">Branch: </span><span class="body-1">{{conf.agtbranch}}</span> </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>
<style scoped>
  .card {
    display: inline-block;
    display: table;
    float: left;
    margin: 3px;
    width: 250px;
  }
</style>
