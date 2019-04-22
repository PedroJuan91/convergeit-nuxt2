<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm10
      md9 >
      <v-list
        v-for="(item, index) in items"
        :key="index" >
        <v-flex py-2>
          <v-list-tile
            avatar
            ripple
          >
            <v-list-tile-avatar>
              <v-icon>client</v-icon>
            </v-list-tile-avatar>
            <v-flex my-3>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.cltname }} </v-list-tile-title>
                <v-list-tile-sub-title>Address: {{ item.cltaddress }} <br > Email Address: {{ item.cltemail }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-flex>
          </v-list-tile>
        </v-flex>
        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
          inset
        />
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'FeaturedClients',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
      }
    },
  }

</script>
