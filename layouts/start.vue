<template>
  <v-app dark >
    <header>

      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list 
          v-for="item in items" 
          :key="item.id">
          <v-list-tile
            :to="item.to"
            router
          >
            <v-list-tile-action>
              <v-icon
              >{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
              >{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <theHeader
        :main-title="namedefault"
        :btns="headeritems"
        @toggle-drawer="drawer = !drawer"
      />
    </header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <theFooter />
  </v-app>
</template>

<script>
import theHeader from '@/components/header/ulo'
import theFooter from '@/components/footer/foot'
  export default {
    components: {
      theHeader,
      theFooter
    },
    data() {
      return {
        namedefault: 'Converge IT solutions, a solution matches your home',
        items: [
          { icon: 'bubble_chart', title: 'Welcome', to: '/'}
        ],
        headeritems: [
          {id:1, btnName: 'Login', btnTo: '/account/login'}
        ],
        drawer: false
      }
    },
    mounted(){
      this.$nextTick(() => {
        setTimeout(() => {
          this.$nuxt.$loading.finish()
        }, 3000)
      })
    },
  }
</script>
