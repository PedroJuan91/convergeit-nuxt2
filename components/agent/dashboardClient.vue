<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm7
      md6 >
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          avatar
          ripple
          @click.native="originTem(item.id)"
        >
          <v-list-tile-avatar>
            <v-img
              :aspect-ratio="16/9"
              :src="item.cltimg" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.cltname }} </v-list-tile-title>

            <v-list-tile-sub-title> <v-icon>email</v-icon>{{ item.cltemail }}</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
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
      originTem(id){
        return this.$router.push(`/agents/customer/${id}`)
      }
    }
  }

</script>
