<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex 
          xs12 
          sm6 
          offset-xs3>
          <v-card>
            <v-card-title>
              <h2>Login Here!</h2>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form 
                  ref="form" 
                  v-model="valid" 
                  @submit.prevent="submit">
                  <v-layout 
                    row 
                    wrap>
                    <v-flex 
                      xs12 
                      sm9 
                      offset-xs2>
                      <v-text-field
                        id="username"
                        v-model="username"
                        :rules="[rules.required, rules.email]"
                        solo-inverted
                        label="username"/>
                    </v-flex>
                  </v-layout>
                  <v-layout 
                    row 
                    wrap>
                    <v-flex 
                      xs12 
                      sm9 
                      offset-xs2>

                      <v-text-field
                        id="password"
                        v-model="password"
                        :rules="[rules.required]"
                        solo-inverted
                        label="password"
                        type="password"/>
                    </v-flex>
                  </v-layout>
                  <v-layout 
                    row 
                    wrap>
                    <v-spacer/>
                    <v-flex 
                      xs12 
                      sm4 >
                      <v-btn 
                        :disabled="!validIN" 
                        type="submit" >Login</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              top
            >
              {{ text }}
              <v-btn
                light
                flat
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>

  export default {
    data(){
      return {
        password: '',
        username: '',
        valid: true,
        snackbar: false,
        mode: '',
        timeout: 5000,
        text: 'Not send, Please do again',
        rules: {
          email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    validIN() {
      return this.username !== '' &&
            this.password !== ''
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()){
        const login = {
          email: this.username,
          password: this.password
        }
        this.$nuxt.$loading.start()
        this.$store.dispatch('userLogin', login)
        .then(() => {
          setTimeout(() => this.$router.push('/agents'),2000)
        })
        .catch(e => {
          if(e.code == 408){
            this.text = e.message
            this.snackbar = true
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
            this.$router.push('/public/vendor.bundle.00f8a7a6911fb6e55d16.js')
          }else {
            this.text = e.message
            this.snackbar= true
          }
        })
      }else{
        return this.snackbar = true
      }
    }
  }
}
</script>
