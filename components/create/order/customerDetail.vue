<template>
  <v-dialog
    :v-model="dialog"
    width="600"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Client Detail
      </v-card-title>

      <v-card-text>
        <h1>name: {{ clientName }}</h1>

        <h2>Email: {{ clientEmail }}</h2>
        <h2>Address: {{ clientAddress }}</h2>
        <h2>Phone: {{ clientPhone }}</h2>

      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click.capture="$emit('toggle-end')"
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      props: {
        clientName: {
          type: String,
          required: true
        },
        clientEmail: {
          type: String,
          required: true
        },
        clientPhone: {
          type: String,
          required: true
        },
        clientAddress: {
          type: String,
          required: true
        },
        dialog: {
          type: String,
          required: true
        }
      }
    }
  }
}
</script>
