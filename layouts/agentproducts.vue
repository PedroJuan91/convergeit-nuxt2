<template>
  <v-app light >
    <header>
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        >
        <v-list>
          <v-list-tile>
            <v-list-tile-title><span class="title">Main Menu</span> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="(item, index) in items" :key="index"
            router
            ripple
            :to="item.to"
          >
            <v-list-tile-action>
              <v-icon
              >{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
              >{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />
        </v-list>
        <v-list v-if="$vuetify.breakpoint.xsOnly">

          <v-list-tile>
            <v-list-tile-title><span class="title">  Options</span></v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(item, index) in headerItems" :key="index"
            router
            ripple
            :to="item.btnTo"
          >
            <v-list-tile-action>
              <v-icon
              >{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
              >{{item.btnName}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />
        </v-list>

        <v-list>
          <v-list-tile
          @click="signout"
          ripple
          >
            <v-list-tile-action>
              <v-icon>work_off
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign out
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-navigation-drawer>
      <routeToolbar v-for="(itemed, index) of headerItems" :key="index"
      mainTitle="Products"
      @toggle-drawer="drawer = !drawer"
      :btns="headerItems"
      />
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
    </header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import routeToolbar from '@/components/header/ulo'
import {mapState} from 'vuex'
  export default {
    components: {
      routeToolbar
    },
    data(){
      return {
        items: [
          { icon: 'dashboard', title: 'Dashboard', to: '/agents/' },
            { icon: 'account_box', title: 'Client', to: '/agents/customer' },
            { icon: 'bookmarks', title: 'Products', to: '/agents/products' },
            { icon: 'all_inbox', title: 'Orders', to: '/agents/orders' },
            { icon: 'book', title: 'Projects', to: '/agents/projects' }
        ],
        drawer: false,
        headerItems: [
          {id: 1,  btnName: 'New Order', btnTo: '/agents/create/order', icon: 'markunread_mailbox' },
          {id: 2,  btnName: 'New Client', btnTo: '/agents/create/client', icon: 'art_track'},
          {id: 3,  btnName: 'New Product', btnTo: '/agents/create/product', icon:'recent_actors'}
        ],
        src: '/agents/customer/1',
        name: 'New Client',
        text: '',
        snackbar: false,
        timeout: 6000
      }
    },
    computed: {
      ...mapState({
        acct: 'account'
      }),
      fullname: function(){
        if(this.acct != null){
          return  this.acct.agtfname + ' ' + this.acct.agtlname
        }
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.$nextTick(() => {
        setTimeout(() => {
          this.$nuxt.$loading.finish()
        }, 3000)
      })
    },
    methods: {
      signout() {
        this.$nuxt.$loading.start()
        this.$store.dispatch('userLogout')
        .then(() => setTimeout(() => this.$router.push('/'), 3000) )
        .catch(e => {
          if(e.code == 408){
            this.text = e.message
            this.snackbar = true
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
            this.$router.push('/public/vendor.bundle.00f8a7a6911fb6e55d16.js')
          }else {
            this.text = e.message
            this.snackbar= true
          }
        })
      }
    }
  }
</script>
