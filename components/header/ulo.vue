<template>
  <v-toolbar
    :dark="colorChange"
    :clipped-left="clipped"
    :color="myColor"
    fixed
    app>
    <v-toolbar-side-icon @click.stop="$emit('toggle-drawer')"/>
    <v-toolbar-title v-text="mainTitle"/>
    <v-spacer/>
    <v-toolbar-items
      v-if="!$vuetify.breakpoint.xsOnly">
      <v-btn
        v-for="btn in btns"
        :to="btn.btnTo"
        :key="btn.id"
        flat
      >{{ btn.btnName }}
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
      type: Object,
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
