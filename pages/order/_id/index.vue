<template>
  <v-content>
    <!-- <h1>hello orders {{$route.params.id}}</h1> -->
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12 
        sm12 
        md4>
        <v-img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCKPLjbKDK11wrS1VbzXaempsJwhRoMOgMZIJZHuinC9zrKmFM"
          aspect-ratio="2.9"
          width="400px"
        />
      </v-flex>
      <v-flex 
        xs12 
        sm12 
        md6 
        offset-md2>
        <v-spacer />
        <v-layout row>
          <span 
            v-if="data.confirmquotation" 
            class="display-3">Billing Statement</span>
          <span 
            v-else 
            class="display-3">Quotation Statement</span>
        </v-layout>
        <span class="body-1  grey--text">Client name: </span><span class="body-2">{{ data.ordnameto }}</span><br >
        <span class="body-1 grey--text">Address: </span><span class="body-2"> {{ data.address }}</span><br >
        <span class="body-1 grey--text">Email: </span><span class="body-2"> {{ data.ordsend }}</span><br >
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap 
      my-3>
      <v-flex 
        xs12 
        sm12 
        md12 >
        <v-card dark>
          <v-card-actions>
            <v-layout row>
              <span class="display-1">Items</span>
              <v-spacer />
              <v-btn 
                flat 
                @click="itemed = !itemed"><span 
                  v-if="!itemed" 
                  class="title">show items</span><span 
                    v-else 
                    class="title">collapse items</span> </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-container v-if="itemed">
          <productItems :parent="data.ordprodlist" />
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12 
        sm12 
        md12>
        <v-card dark>
          <v-card-actions>
            <v-layout row>
              <span class="display-1">Status Quote</span>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-container>
          <v-layout 
            row 
            wrap>
            <v-flex 
              xs12 
              sm12 
              md3 
              my-5>
              <v-card>
                <v-card-title>
                  <span class="headline"><u>Total Value of Items</u></span>
                </v-card-title>
                <v-card-text>
                  <span class="title">Php {{ data.itemstotal }}.00</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex 
              xs12 
              sm12 
              md6 
              mx-3>
              <v-card v-if="!data.confirmquotation">
                <v-form @submit.prevent="toSubmit">
                  <v-card-title>
                    <v-layout justify-center>
                      <span class="headline">Confirmation</span>
                    </v-layout>
                    <v-layout>
                      <v-checkbox
                        v-model="termsagreement"
                        label="You have agree the listings above and want to direct in payments"
                        class="title black--text"
                      />
                    </v-layout>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn 
                      :disabled="!termsagreement" 
                      type="submit">approve quotation
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
              <v-card v-else-if="!data.hasPaid">
                <v-card-title>
                  <v-layout 
                    row 
                    justify-center>
                    <span 
                      mt-3 
                      class="display-1">Payments</span>
                  </v-layout>
                </v-card-title>
                <v-card-text>
                  <v-layout row>
                    <v-flex 
                      xs6 
                      sm6 
                      md8 
                      my-4>
                      <v-form @submit.prevent="payment">
                        <v-radio-group v-model="pay">
                          <v-radio 
                            v-for="(item, index) in labels" 
                            :key="index"
                            :label="`I want to pay ${item.label}`"
                            :value="item.val"
                          />
                          <div v-if="$vuetify.breakpoint.mdAndUp">
                            <v-btn type="submit" > <span v-if="pay === 2">Full payment with paypal</span> <span v-else>Half Payment with paypal</span> </v-btn>
                          </div>
                          <div v-else>
                            <v-btn type="submit"><v-icon>credit_card</v-icon> via paypal</v-btn>
                          </div>
                        </v-radio-group>
                      </v-form>
                    </v-flex>
                    <v-flex 
                      xs6 
                      sm6 
                      md6>
                      <v-layout 
                        row 
                        justify-center><span 
                          class="headline" 
                          flat>Disclaimer!!</span> </v-layout>
                      <span class="subheading">
                        Hello World!!<br>
                        Please be notified that the services under this system
                        are still in <u>development mode</u>. And please be guided that every transactions
                        are <u><b>NOT REAL</b></u>. Thanks!!</span>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-card v-else>
                <v-card-title><v-layout justify-center><span class="headline"> Confirmed Payment</span></v-layout></v-card-title>
                <v-card-content>
                  <v-layout>
                    <v-flex 
                      xs6 
                      sm6 
                      md6>
                      <v-flex mb-3>
                        <v-list>
                          <v-list-tile>
                            <span class="grey--text body-1">mode of payment: </span><span class="black--text subheading">{{ data.modepay }} payment</span>
                          </v-list-tile>
                          <v-list-tile v-if="data.modepay === 'half'">
                            <v-btn @click="halfpay"> pay in full </v-btn>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-list>
                        <v-list-tile v-if="data.modepay === 'full'">
                          <span class="body-1">Thank you for paying in full <br> Please inquest the agent for details of the project</span>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex 
                      xs6 
                      sm6 
                      md6>
                      <v-layout justify-center><span class="title">Disclaimer</span> </v-layout>
                      <span class="subheading">
                        hello world! <br >
                        Please be notified that the services under this system
                        are still in <u>development mode</u>. And please be guided that every transactions
                        are <u><b>NOT REAL</b></u>. Thanks!!
                      </span>
                    </v-flex>
                  </v-layout>
                </v-card-content>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
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
  </v-content>
</template>
<script>
import productItems from '@/components/agent/order/productitems'
import firebase from 'firebase'
import firebaseConfig from '@/plugins/configFirebase'
import ids from '@/keys'
export default {
  components: {
    productItems
  },
  data() {
    return {
      itemed: false,
      termsagreement: false,
      pay: 2,
      labels: [
        {label: 'full', val: 2},
        {label: 'half', val: 1}
      ],
      text: '',
      snackbar: false,
      timeout: 6000
    }
  },
  computed:{
    data(){
      return this.$store.getters.profileOrder(this.order)
    },
    half(){
      if(this.pay === 0){
        return true
      }else{
        return false
      }
    },
    paylabel(){
      if(this.pay === 1){
        return 'half'
      }
      if(this.pay === 2){
        return 'full'
      }
    }
  },

  mounted(){
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  },
  layout: 'theorders',
  async asyncData ({store, params, redirect}) {
    if (!firebase.apps.length){
      await firebase.initializeApp(firebaseConfig)
      await firebase.auth().onAuthStateChanged((user) => {
         if (user){
           store.commit('setUser', user)
         }
       })
    }
    function splits(data, reg){
      const comp = data.split(reg)
      const res = [comp.shift()]
      if(comp.length){
      	res.push(comp.join(reg))
      }
      return res
    }
    const splitted = splits(params.id, '-')
    const root =  await firebase.database().ref()
    const order = await root.child(`orders/${splitted[0]}`).once('value')
    const orderbyclient = await root.child(`orderbyclient/${splitted[0]}`).once('value')
    const data = await order.toJSON()
    const data2 = await orderbyclient.toJSON()
    const lay = []
    const lay2 = []
    for (let i in data){
      lay.push({id: i, ...data[i]})
    }
    for (let o in data2){
      lay2.push({id: o, ...data2[o]})
    }
    store.commit('order/myOrders', lay)
    store.commit('order/myorderbycustomer', lay2)
    const ordno = `-${splitted[1]}`
    return {order : ordno}
  },
  methods: {
    halfpay(){
      const payment = this.data.itemstotal / 2
      const route = this.$route.params.id
      const datapay = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: process.env.host + `pay-paypal/success-half`,
          cancel_url: process.env.host + `pay-paypal/cancel`
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: `ConvergeIT project payment || mode: half-full payment`,
                  sku: `0011`,
                  price: `${payment}.00`,
                  currency: 'PHP',
                  quantity: 1
                }
              ]
            },
            amount: {
              currency: 'PHP',
              total: `${payment}.00`
            },
            description: 'Details are listed on ' + process.env.host + `${route}`
          }
        ]
      }
      const datapayJSON = JSON.stringify(datapay)
      this.$store.dispatch('order/clientpayspaypal', {amount: payment, data: datapayJSON, id: this.$route.params.id})
      .then(data => {
        const link = data.links.find(lin => lin.rel === 'approval_url')
        window.location.href = link.href
      })
      .catch(e => {
          this.text = e.message
          this.snackbar = true
      })
    },
    toSubmit(){
      this.$store.dispatch('order/approveQuotation', {id: this.$route.params.id, email: this.data.ordsend, clientid: this.data.cltid})
      .then(() => {
        window.location.href = process.env.host + `order/${this.$route.params.id}`
      })
    },
    payment(){
      let clientpay = ''
      let payment = this.data.itemstotal
      const route = this.$route.params.id
      if(this.pay === 1){
        clientpay = 'half'
        payment = payment / 2
      }
      if(this.pay === 2){
        clientpay = 'full'
        payment = payment
      }
      const datapay = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: process.env.host + `pay-paypal/success`,
          cancel_url: process.env.host + `pay-paypal/cancel`
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: `ConvergeIT project payment || mode: ${clientpay} payment`,
                  sku: `00${this.pay}`,
                  price: `${payment}.00`,
                  currency: 'PHP',
                  quantity: 1
                }
              ]
            },
            amount: {
              currency: 'PHP',
              total: `${payment}.00`
            },
            description: 'Details are listed on ' + process.env.host + `${route}`
          }
        ]
      }

      const datapayJSON = JSON.stringify(datapay)
      this.$store.dispatch('order/clientpayspaypal', {amount: payment, data: datapayJSON, id: this.$route.params.id})
      .then(data => {
        const link = data.links.find(lin => lin.rel === 'approval_url')
        window.location.href = link.href
      })
      .catch(e => {
          this.text = e.message
          this.snackbar = true
      })

    }
  },
}
</script>
