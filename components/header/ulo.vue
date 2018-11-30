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
    <span
      v-if="!$vuetify.breakpoint.xsOnly" >
      <v-toolbar-items
        v-for="btn in btns"
        :key="btn.id">
        <v-btn
          :to="btn.btnTo"
          flat
        >{{ btn.btnName }}
        </v-btn>
      </v-toolbar-items>
    </span>
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
