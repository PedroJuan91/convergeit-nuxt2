<template>
  <v-layout 
    row 
    wrap>
    <v-flex 
      xs12 
      sm6 
      md4 
      offset-xs4 
      mt-5>
      <v-card>
        <v-card-title>
          <v-layout justify-center>
            <h1>Login Admin</h1>
          </v-layout>
        </v-card-title>
        <v-form 
          ref="form" 
          v-model="valid" 
          @submit.prevent="onLogin">
          <v-card-text>
            <v-text-field
              id="adminuname"
              v-model="adminuname"
              :rules="[rules.required, rules.email]"
              label="Username Admin"
              solo-inverted/>
            <v-text-field
              id="adminpword"
              v-model="adminpword"
              :rules="[rules.required]"
              label="Password Admin"
              type="password"
              solo-inverted/>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn type="submit">Submit
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
</template>
<script>
import firebase from 'firebase'
export default {
  layout: 'login',
  data() {
    return {
      valid: true,
      adminuname: "",
      adminpword: '',
      text: '',
      timeout: 6000,
      snackbar: false,
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
    onLogin(){
      this.text = 'Something is wrong, please try again'
      if(this.$refs.form.validate()){
        const adminLog = {
          email: this.adminuname,
          password: this.adminpword
        }
        //console.log(adminLog)
        this.$store.dispatch('admin/loginAdmin', adminLog)
        .then(e => {
          this.$router.push('/admin/')
        })
        .catch(e => {
          this.text = e.message
          this.snackbar = true
        })

      }else{
        this.snackbar = true
      }
    }
  }
}
</script>
