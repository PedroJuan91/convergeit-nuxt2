<template>
  <v-app light>
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
