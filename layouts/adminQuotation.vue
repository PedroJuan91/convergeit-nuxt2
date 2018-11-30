<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app>
      <v-list 
        v-for="(item, index) in drawering" 
        :key="index">
        <v-list-tile
          :to="item.to"
          router
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="$vuetify.breakpoint.xsOnly">
        <v-divider />
        <v-list-tile
          :to="heading[0].btnTo"
          router>
          <v-list-tile-action>
            <v-icon>{{ heading[0].icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ heading[0].btnName }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-divider />
        <v-list-tile 
          ripple 
          @click="signout">
          <v-list-tile-action>
            <v-icon> work_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign out
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list >

    </v-navigation-drawer>
    <the-header
      :main-title="mainTitle"
      :btns="heading"
      :color-change="wanted"
      my-color="blue-grey"
      @toggle-drawer="drawer = !drawer"
    />
    <v-content>
      <nuxt />
    </v-content>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import theHeader from '@/components/header/ulo'
export default {
  components: {
    theHeader
  },
  data(){
    return {
      mainTitle: 'Approved Quotations',
      wanted: true,
      text: '',
      snackbar: false,
      timeout: 6000,
      drawering: [
        {icon: 'dashboard', title: 'Dashboard', to: '/admin/'},
        {icon: 'assignment', title: 'Page information', to: '/admin/profile'}
      ],
      heading: [
        {btnName: 'New Agent', btnTo: '/admin/agent/create', icon: 'playlist_add'}
      ],
      drawer: false
    }
  },
  methods: {
    signout(){
      this.$store.dispatch('admin/logout')
      .then(() => this.$router.push('/'))
      .catch(e => {
        this.text = e.message
        this.snackbar = true
      })
    }
  }
}
</script>
