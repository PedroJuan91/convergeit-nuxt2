<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 offset-xs1>
        <v-container>
          <v-layout row wrap>
            <v-flex>
              <v-toolbar dark>
                <v-toolbar-title>
                  <span>Recent Agent Orders</span>
                </v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn flat to='/admin/agent/order'><span>All orders</span> </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-card>
                <span class="display-1" v-if="orderNum < 1">Your agents did not order yet</span>
                <order-dash v-else :items="listOrder" />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-container>
          <v-card>
        <v-tabs v-model="primary">
          <v-tab v-for="(item, index) in primaryhead" :key="index" ripple>
            {{item.title}}
          </v-tab>
          <v-tab-item v-for='n in primaryhead.length' :key="n" >
            <v-layout v-if="n===1">
              <v-flex>
                  <span v-if="conflen < 1" class="subheading">No confirmations on orders</span>
                  <v-list v-else>
                    <v-btn flat to='/admin/agent/quotation'><span class="grey--text"> View all list</span></v-btn>
                    <v-list-group v-for="(conf, index) in confall" :key="index">
                      <v-list-tile slot="activator">
                        <v-list-tile-title>{{$dateFilter(conf.approvetime)}}</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title><span class="caption grey--text">Agent: </span><span class="body-1">{{conf.agtlname + ', ' + conf.agtfname}}</span> </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title><span class="caption grey--text">Client: </span><span class="body-1">{{conf.cltname}}</span> </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title><span class="caption grey--text">Branch: </span><span>{{conf.agtbranch}}</span> </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
              </v-flex>
            </v-layout>
            <v-layout v-if="n===2">
              <v-flex>
                <v-list>
                  <v-subheader>Full Payments <v-btn to='/admin/agent/payment/full' flat><span class="grey--text"> View All</span></v-btn></v-subheader>
                  <payfull :items='payfulldat'/>
                  <v-subheader>Half Payments <v-btn to='/admin/agent/payment/half' flat><span class="grey--text"> View All</span></v-btn></v-subheader>
                  <payhalf :items='payhalfdat' />
                </v-list>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-card>
        </v-container>
      </v-flex>
    </v-layout>
    <!-- per agent info -->
    <v-layout row mt-5>
      <v-flex xs12 sm4 md3>
        <v-card>
          <v-subheader >Select Agent Branch </v-subheader>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 md6>
        <span class="display-1" v-if="agentNum <1">You have no Employees / Agents</span>
        <v-select v-else v-model="lAgent" :items="listAgents" item-text='agtbranch' item-value="id" solo />
        <!-- <v-btn @click="value">agent id</v-btn> -->
      </v-flex>
    </v-layout>
    <v-layout row wrap mb-5>
      <v-flex xs12 sm7 md7 v-if="lAgent !== null">
       <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
         <v-tab v-for="(item, index) in heads" :key="index" ripple>
           {{item.title}}
         </v-tab>
         <v-tab-item v-for="n in heads.length" :key="n">
           <v-layout v-if="n === 1">
             <v-flex v-if="lenorder < 1">
               <span class="subheading">Agent has not order yet</span>
             </v-flex>
             <v-flex v-else>
               <order-list />
             </v-flex>
           </v-layout>
           <v-layout v-if="n === 2">
             <v-flex v-if="lenclient< 1">
               <span class="subheading">Agent has no client yet</span>
             </v-flex>
             <v-flex v-else>
               <client-list />
             </v-flex>
           </v-layout>
           <v-layout v-if='n === 3'>
             <v-flex v-if="lenclient< 1">
               <span class="subheading">Agent's clients has no full payments yet</span>
             </v-flex>
             <v-flex>
               <v-list>
                <agentfullpay :items='agentpaidfull' />
               </v-list>
             </v-flex>
           </v-layout>
           <v-layout v-if='n === 4'>
             <v-flex v-if="lenclient< 1">
               <span class="subheading">Agent's clients has no half payments yet</span>
             </v-flex>
             <v-flex>
               <v-list>
                 <agenthalfpay :items='agentpaidhalf'/>
               </v-list>
             </v-flex>
           </v-layout>
         </v-tab-item>
       </v-tabs>
     </v-flex>
     <v-flex xs12 sm4 md4 v-if="lAgent !== null" mx-2>
       <v-card>
         <v-toolbar>
           <v-toolbar-title>Agent Personal Information</v-toolbar-title>
         </v-toolbar>
         <v-list>
           <v-list-tile>
             <v-list-tile-title><span class="body-2">Agent name: </span>{{agentinfo.agtlname}}, {{agentinfo.agtfname}}</v-list-tile-title>
           </v-list-tile>
           <v-list-tile>
             <v-list-tile-content>
               <v-list-tile-title><span class="body-2">Agent email: </span>{{agentinfo.agtemail}}</v-list-tile-title>
             </v-list-tile-content>
           </v-list-tile>
           <v-list-tile>
             <v-list-tile-content>
               <v-list-tile-title><span class="body-2">Agent branch: </span>{{agentinfo.agtbranch}}</v-list-tile-title>
             </v-list-tile-content>
           </v-list-tile>

           <v-list-group>
             <v-list-tile slot="activator">
               <v-list-tile-title>Select Action</v-list-tile-title>
             </v-list-tile>
             <v-list-tile>
               <v-list-tile-action>
                 <v-btn flat @click="detailclient(lAgent)"> <span class="blue--text">View all client</span></v-btn>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile>
               <v-list-tile-action>
                 <v-btn flat @click='detailorder(lAgent)'> <span class="orange--text">View all order</span></v-btn>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile>
               <v-list-tile-action>
                 <v-btn flat @click="detailfullpay(lAgent)"> <span class="green--text">View all full payments</span></v-btn>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile>
               <v-list-tile-action>
                 <v-btn flat @click="detailhalfpay(lAgent)"> <span class="green--text">View all half payments</span></v-btn>
               </v-list-tile-action>
             </v-list-tile>
           </v-list-group>
         </v-list>
       </v-card>
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
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
import payfull from '@/components/admin/agent/payment/full'
import payhalf from '@/components/admin/agent/payment/half'
import orderDash from '@/components/agent/dashboardOrder'
import orderList from '@/components/admin/order'
import clientList from '@/components/admin/client'
import agentfullpay from '@/components/admin/agent/payment/full'
import agenthalfpay from '@/components/admin/agent/payment/half'
import firebase from 'firebase'
import firebaseConfig from '@/plugins/configFirebase'
  export default {
    created(){
      this.$store.dispatch('admin/loadData')
      .catch(e => {
        this.text = e.message
        this.snackbar = true
      })
    },
    layout: 'admin',
    async asyncData(){
      if (!firebase.apps.length){
        await firebase.initializeApp(firebaseConfig)
        await firebase.auth().onAuthStateChanged((user) => {
           if (user){
             store.commit('setUser', user)
           }
         })
      }
    },
    computed: {
      ...mapGetters({
        agentNum: 'admin/loadAgentslength',
        clientNum: 'admin/clientslength',
        orderNum: 'admin/orderslength',
        listOrder: 'admin/featuredorder',
        listAgents: 'admin/goagents',
        lenorder: 'admin/agentorderlen',
        lenclient: 'admin/agentclientlen',
        agentinfo: 'admin/agentinfo',
        confall: 'admin/confcuts',
        conflen: 'admin/conflen',
        agentpaidfull: 'admin/featuredlistagentpay',
        agentpaidhalf: 'admin/featuredlistagentpayhalf'
      }),
      payfulldat(){
        return this.$store.getters['admin/featuredmergefullPayOrder']
      },
      payhalfdat(){
        return  this.$store.getters['admin/featuredmergehalfPayOrder']
      },

    },
    watch: {
      lAgent: function (val) {
        this.$store.dispatch('admin/fetchAgentid', val)
      }
    },
    data () {
      return {
        lAgent: null,
        snackbar: false,
        text: '',
        timeout: 6000,
        active: null,
        heads: [
          {title: 'Order'},
          {title: 'Clients'},
          {title: 'Full Payments'},
          {title: 'Half Payments'}
        ],
        primaryhead: [
          {title: 'Confirmed Quotation'},
          {title: 'Payments'}
        ],
        primary: null
      }
    },
    methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      },
      detailclient(val){
        return this.$router.push('/admin/agent/client/' + val)
      },
      detailorder(val){
        return this.$router.push('/admin/agent/order/' + val)
      },
      detailfullpay(val){
        return this.$router.push('/admin/agent/payment/full/' + val)
      },
      detailhalfpay(val){
        return this.$router.push('/admin/agent/payment/half/' + val)
      }
    },
    components: {
      orderDash,
      orderList,
      clientList,
      payfull,
      payhalf,
      agentfullpay,
      agenthalfpay
    }
  }
</script>
