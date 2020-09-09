<template>
  <v-content> <loginCard /> </v-content>
</template>
<script>
import loginCard from "@/components/login/log";
export default {
  layout: "start",
  components: {
    loginCard
  }
};
</script>
