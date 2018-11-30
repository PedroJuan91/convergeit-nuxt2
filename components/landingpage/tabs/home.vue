<template>
  <v-content>
    <v-layout 
      v-for="(item, index) in items" 
      :key="index" 
      row 
      wrap>
      <v-flex 
        xs12 
        sm12 
        md12 
        my-5>
        <v-hover >
          <v-card slot-scope="{hover}">
            <v-toolbar dark>
              <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            </v-toolbar>
            <v-responsive>
              <v-img 
                v-if="hover"  
                :aspect-ratio="3/2" 
                :src="item.image" />
            </v-responsive>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
export default {
  data(){
    return {
      items: [
        {title: 'Smarter Homes', image: 'https://www.zdnet.de/wp-content/uploads/2014/10/smart-home-shutterstock.jpg'},
        {title: 'Smarter Business', image: 'http://ericflynn.me/wp-content/uploads/2013/02/smart_business_ad_2_8_o.jpg'}
      ]
    }
  }
}
</script>
