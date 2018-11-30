<template>
  <v-layout row>
    <v-flex 
      ml-1 
      xs3 
      sm3 
      md3>
      <span>{{ prodname }} </span>
    </v-flex>
    <v-flex 
      v-for="(desc, index) in proddesc" 
      :key="index" 
      xs6 
      sm6 
      md6>
      <ul>
        <li>{{ desc.text }}</li>
      </ul>
    </v-flex>
    <v-flex 
      xs3 
      sm3 
      md1 >
      <span> qty: {{ prodqty }}</span>
    </v-flex>
    <v-flex 
      xs3 
      sm3 
      md2 >
      <span> {{ prodprice }}</span>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: {
      prodname: {
        type: String,
        required: true
      },
      proddesc: {
        type: Array,
        required: true
      },
      prodqty: {
        type: [String, Number],
        required: true
      },
      prodprice: {
        type: [String, Number],
        required: true
      }

    }
  }
</script>
