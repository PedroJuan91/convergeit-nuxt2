<template>
  <v-content>
    <v-layout 
      v-for="(item, index) in items" 
      :key="index">
      <v-flex my-5>
        <v-hover>
          <v-card slot-scope="{hover}">
            <v-toolbar dark>
              <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            </v-toolbar>
            <v-responsive >
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
  data() {
    return {
      items: [
        {title: 'Installation on Secured Cameras', image: 'https://aksinternational.ae/wp-content/uploads/2015/07/cctv.jpg'},
        {title: 'Automated system for traditional rooms', image: 'http://www.rfid-library.com/style/images/rfid_e01.jpg'}
      ]
    }
  }
}
</script>
