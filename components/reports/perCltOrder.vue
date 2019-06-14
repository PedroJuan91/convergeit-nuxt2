<template>
  <v-flex>
    <v-list
      two-line>
      <v-list-tile
        v-for="(n, index) in data"
        :key="index"
        @click="goprofile(n.id)">
        <v-list-tile-avatar>
          <v-icon>
            shopping_basket
          </v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-icon>
              payment
            </v-icon>
            <span>{{ n.itemstotal }}.00</span>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <v-icon>
              calendar_today
            </v-icon>
            <span>{{ $dateFilter(n.orddate) }} </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>
  <script>
    export default {
      props: {
        data: {
          type: Array,
          required: true
        }
      },
      methods: {
        goprofile(id){
          return this.$router.push('/agents/orders/' + id)
        }
      }
    }
  </script>
