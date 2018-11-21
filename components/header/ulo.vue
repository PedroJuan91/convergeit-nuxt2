<template>
    <v-toolbar fixed app :dark="colorChange" :clipped-left="clipped" :color="myColor">
      <v-toolbar-side-icon @click.stop="$emit('toggle-drawer')"></v-toolbar-side-icon>
      <v-toolbar-title v-text="mainTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="btn in btns" :key="btn.id">
        <v-btn flat v-if="!$vuetify.breakpoint.xsOnly" :to="btn.btnTo"
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
