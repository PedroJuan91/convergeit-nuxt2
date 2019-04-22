<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm7
      md7 >
      <v-list
        v-for="(item, index) in items"
        :key="index" >
        <v-flex py-2>
          <v-list-tile
            avatar
            ripple
            @click.native="originOrd(item.id)"
          >
            <v-list-tile-avatar>
              <v-img
                :aspect-ratio="16/9"
                :src="item.cltimg"/>
            </v-list-tile-avatar>
            <v-flex my-3>
              <v-list-tile-content>
                <v-list-tile-title> {{ item.ordnameto }} </v-list-tile-title>
                <v-list-tile-sub-title><v-icon>date_range</v-icon> {{ $dateFilter(item.orddate) }} </v-list-tile-sub-title>
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
    methods:{
      originOrd(id){
        return this.$router.push(`/agents/orders/${id}`)
      }
    }
  }

</script>
