<template>
  <v-content>
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12 
        sm6 
        md5 
        offset-xs3>
        <v-card>
          <v-card-title>
            <h1>New Agent</h1>
          </v-card-title>
          <v-form 
            ref="form" 
            v-model="valid" 
            @submit.prevent="submit">
            <v-card-text>
              <v-text-field
                id="agtfname"
                v-model="agtfname"
                :rules="[rules.required]"
                label="Agent Firstname"
                solo-inverted
              />
              <v-text-field
                id="agtlname"
                v-model="agtlname"
                :rules="[rules.required]"
                label="Agent Lastname"
                solo-inverted/>
              <v-text-field
                id="agtlbranch"
                v-model="agtbranch"
                :rules="[rules.required]"
                label="Company Branch"
                solo-inverted/>
              <v-text-field
                id="agtemail"
                v-model="agtemail"
                :rules="[rules.required, rules.email]"
                label="Agent Email"
                solo-inverted/>
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
