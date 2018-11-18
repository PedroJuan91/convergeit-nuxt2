<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12 sm6 md5 offset-xs3>
        <v-card>
          <v-card-title>
            <h1>New Agent</h1>
          </v-card-title>
          <v-form v-model="valid" ref="form" @submit.prevent="submit">
            <v-card-text>
              <v-text-field
              label="Agent Firstname"
              v-model="agtfname"
              solo-inverted
              :rules="[rules.required]"
              id="agtfname"
              >
              </v-text-field>
              <v-text-field
              label="Agent Lastname"
              solo-inverted
              v-model="agtlname"
              id="agtlname"
              :rules="[rules.required]">
              </v-text-field>
              <v-text-field
              label="Company Branch"
              solo-inverted
              v-model="agtbranch"
              id="agtlbranch"
              :rules="[rules.required]">
              </v-text-field>
              <v-text-field
              label="Agent Email"
              v-model="agtemail"
              id="agtemail"
              solo-inverted
              :rules="[rules.required, rules.email]">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
              flat
              type="submit">submit
              </v-btn>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
  export default {
    layout: 'admin',
    data(){
      return {
        agtfname: '',
        agtlname: '',
        agtemail: '',
        agtbranch: '',
        snackbar: false,
        text: '',
        timeout: 5000,
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
      submit() {
        this.text = 'Something wrong in form, please try again'
        if(this.$refs.form.validate()){
          const agent = {
            agtfname: this.agtfname,
            agtlname: this.agtlname,
            agtbranch: this.agtbranch,
            agtemail: this.agtemail,
            agtclients: [],
            agtorders: []
          }
          const pass = process.env.defaultp
          this.$store.dispatch('userCreate', {agent, pass})
          .then(() => this.$router.push('/admin/'))
          .catch((e) => {
            this.text = e.message
            this.snackbar = true
          })
        }
      }
    }

  }
</script>
