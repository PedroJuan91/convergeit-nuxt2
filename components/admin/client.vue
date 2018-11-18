<template>
  <v-layout>
    <v-flex>
      <v-list >
        <v-list-group v-for="(item, index) in client" :key="index">
          <v-list-tile slot="activator">
            <v-list-tile-title >
              {{item.cltname}}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="body-2">Client email: </span>{{item.cltemail}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="body-2">Client Phone number: </span>{{item.cltphone}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="body-2">Client current address: </span>{{item.cltaddress}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><span class="body-2">Client Register date:  </span>{{$dateFilter(item.cltdate)}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      client: 'admin/featuredagentclient'
    })
  }
}
</script>
