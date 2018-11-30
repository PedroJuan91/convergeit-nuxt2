<template>
  <v-flex>
    <v-form v-model="valid" ref="form" @submit.prevent="submit">
      <v-text-field
        maxLength='12'
        v-model="cltname"
        id="cltname"
        value="hellow"
        solo-inverted
        :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
        v-model="cltaddress"
        label="Client Address"
        id="cltaddress"
        solo-inverted
        :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
        v-model="cltemail"
        label="Client Email"
        id="cltemail"
        solo-inverted
        :rules="[rules.required, rules.email]"
      ></v-text-field>

      <v-text-field
        v-model="cltphone"
        label="Client Phone"
        id="cltphone"
        mask="####-#######"
        solo-inverted
        :rules="[rules.required, rules.limit]"
      ></v-text-field>
      <v-text-field
      label="Client image url"
      id="cltimg"
      v-model="cltimg"
      :rules="[rules.required]">
      </v-text-field>

      <v-layout row>
        <v-flex xs12 sm12 md12 offset-sm2>
          <img :src="cltimg" height="150">
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!validIn" type="submit">Submit</v-btn>
      </v-card-actions>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-flex>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    validIn() {
    return this.cltname !== '' &&
           this.cltemail !== '' &&
           this.cltaddress !== '' &&
           this.cltphone !== '' &&
           this.cltimg !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  data(){
    return {
      cltimg: this.data.cltimg,
      cltname: this.data.cltname,
      cltaddress: this.data.cltaddress,
      cltemail: this.data.cltemail,
      cltphone: this.data.cltphone,
      date: new Date(),
      time: new Date(),
      snackbar: false,
      timeout: 3000,
      text: 'Something is wrong in form, please try again',
      valid: true,
      rules: {
        email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
        },
        required: value => !!value || 'Required.',
        limit: value=> value.length >= 11 || 'Must be a complete phone number'
      }
    }
  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
        const client = {
          cltid: this.data.id,
          cltname: this.cltname.toUpperCase(),
          cltimg: this.cltimg,
          cltemail: this.cltemail,
          cltaddress: this.cltaddress,
          cltphone: this.cltphone,
          cltdate: this.submittableDateTime.toISOString()
        }
        this.$store.dispatch('edit/clientEdit', client).then(() => {
          this.$router.push('/agents')
        }).catch(e => {
          this.text = e.message
          this.snackbar = true
        })
      }
    }
  }
}
</script>
