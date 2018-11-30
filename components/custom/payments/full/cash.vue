<template>
  <v-content>
    <v-form 
      ref="form" 
      v-model="valid" 
      @submit.prevent="submit">
      <v-layout>
        <v-flex 
          xs5 
          sm3 
          md3 
          lg3>
          <span class="body-2 grey--text">Amount to pay: </span>
        </v-flex >
        <v-flex>
          <span class="subheading font-weight-black">Php {{ cashTotal }}.00</span>
        </v-flex>
      </v-layout>
      <v-layout my-3>
        <v-flex 
          xs12 
          sm5 
          md3 
          offset-xs0 
          offset-lg1>
          <v-text-field 
            id="cashPay" 
            v-model="cashPay" 
            :rules="[rules.required]"
            box 
            prefix="₱" 
            suffix=".00" 
            label="Cash on Hand"/>
        </v-flex>
        <v-flex 
          xs12 
          sm5 
          md3 
          offset-xs0 
          offset-lg1>
          <v-btn 
            type="submit" 
            flat><v-icon large>account_balance_wallet</v-icon><span class="body-2">Client Pay</span> </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-content>
</template>
<script>
export default {
  props: {
    cashTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      rules: {
        email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
        },
        required: value => !!value || 'Required.',
        limit: value=> value.length >= 11 || 'Must be a complete phone number'
      },
      cashPay: 0
    }
  }
}
</script>
