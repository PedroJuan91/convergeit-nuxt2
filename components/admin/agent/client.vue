<template>
  <v-flex 
    xs12 
    sm9 
    md9 
    offset-xs2>
    <v-card 
      v-for="(item, index) in items" 
      :key="index" 
      class="card">
      <v-list>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-card-title>
              <span class="title">{{ item.cltname }}</span>
            </v-card-title>
          </v-list-tile>
          <v-card-text>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="caption">Client email: </span> <span>{{ item.cltemail }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="caption">Client Phone number: </span>{{ item.cltphone }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="caption">Client current address: </span>{{ item.cltaddress }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><span class="caption">Client Register date:  </span>{{ $dateFilter(item.cltdate) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-text>
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
    margin: 10px;
  }
</style>
