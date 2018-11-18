<template>
  <v-content>
    <v-container fluid row>
      <v-card>
        <v-img aspect-ratio='2.90' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCKPLjbKDK11wrS1VbzXaempsJwhRoMOgMZIJZHuinC9zrKmFM" />
      </v-card>
    </v-container>
    <v-container>
      <v-layout row>
        <v-flex>
          <v-tabs slot="extension"
          slider-color="grey"
          v-model="model">
            <v-tab
            v-for="(item, index) in tabshead"
            :key="index">
              {{item.title}}
            </v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-tabs-items v-model="model">
        <v-tab-item v-for="(item, index) in tabshead" :key="index">
          <v-layout v-if='index === 0'>
            <v-flex>
              <home />
            </v-flex>
          </v-layout>
          <v-layout v-if='index === 1'>
            <v-flex>
              <prodservice />
            </v-flex>
          </v-layout>
          <v-layout v-if='index === 2'>
            <v-flex>
              <about />
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-content>
</template>
<script>
import home from '@/components/landingpage/tabs/home'
import prodservice from '@/components/landingpage/tabs/productservices'
import about from '@/components/landingpage/tabs/about'

  export default {
    data(){
      return {
        tabshead:[
          {title: 'Home'},
          {title: 'Products and Services'},
          {title: 'About'}

        ],
        model: 'tab-2',
        titlehead: 'Converge IT Solutions',
        contenthead: 'We are a premiere provider of customer-focused telecommunications and ICT Solutions dedicated to equip, enable and empower our clients. As a  pioneer in fiber optic installations, we have dedicated our experience and expertise to ensuring our customers receive the best in networking infrastructure, facilities management, broadband implementation and full telecommunication infrastructure and support.'
      }
    },
    components: {
      home,
      prodservice,
      about
    }
  }
</script>
