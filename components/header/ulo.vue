<template>
    <v-toolbar fixed app :dark="colorChange" :clipped-left="clipped" :color="myColor">
      <v-toolbar-side-icon @click.stop="$emit('toggle-drawer')"></v-toolbar-side-icon>
      <v-toolbar-title v-text="mainTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items  v-if="!$vuetify.breakpoint.xsOnly" v-for="btn in btns" :key="btn.id">
        <v-btn flat :to="btn.btnTo"
        >{{btn.btnName}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>
<script>
export default {
  props: {
    mainTitle: {
      type: String,
      required: true
    },
    btns: {
      type: Array,
      required: false
    },
    myColor: {
      type: String,
      required: false
    },
    colorChange: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  }
}
</script>
