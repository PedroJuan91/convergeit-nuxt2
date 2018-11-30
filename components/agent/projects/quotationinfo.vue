<template>
  <v-flex>
    <v-list 
      v-for="(item, index) in listquotate" 
      :key="index">
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-title>{{ item.cltname }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class="caption">Client email: </span><span class="black--text">{{ item.cltemail }}</span></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class="caption">Client Phone Number: </span><span class="black--text">{{ item.cltphone }}</span></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class="caption">Client Address: </span><span class="black--text">{{ item.cltaddress }}</span></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class="caption">Quotation Approve in: </span><span class="black--text">{{ $dateFilter(item.approvetime) }}</span></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-flex>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      listquotate: 'render/featuredApproveQuotation'
    })
  }
}
</script>
