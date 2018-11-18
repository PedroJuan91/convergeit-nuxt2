import firebase from 'firebase'
import ids from '~/keys'
import cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    tokenadmin: null,
    user: null,
    loadAgents: [],
    orders: [],
    clients: [],
    agentorder: [],
    agentclient: [],
    agentfullpayments: [],
    agenthalfpayments: [],
    agenthalffullpayments: [],
    choosenagent: null,
    confirmlist: [],
    paymentfull: [],
    paymenthalf: [],
    paymenthalffull: [],
    clientdetail: [],
    orderdetail: [],
    paymentfulldetail: [],
    paymenthalfdetail: []
  },
  getters: {
    featuredmergehalfPayOrder(state, getters){
      return getters.mergehalfPayOrder.slice(0, 5)
    },
    mergehalfPayOrderlen(state, getters){
      return getters.mergehalfPayOrder.length
    },
    mergehalfPayOrder(state){
      return state.paymenthalf.map(({agent, display, id, item, payer_dat, payid, timepaid}) => {
        const exist = state.orders.find(item => item.orderid === id)
        return {
          ...exist,
          paymentMode: display,
          paid_item: item,
          payer_dat,
          paidID: payid,
          paid_timesnap: timepaid
        }
      })
    },
    featuredmergefullPayOrder(state, getters){
      return getters.mergefullPayOrder.slice(0, 5)
    },
    mergefullPayOrderlen(state, getters){
      return getters.mergefullPayOrder.length
    },
    mergefullPayOrder(state){
      return state.paymentfull.map(({agent, display, id, item, payer_dat, payid, timepaid}) => {
        const exist = state.orders.find(item => item.orderid === id)
        return {
          ...exist,
          paymentMode: display,
          paid_item: item,
          payer_dat,
          paidID: payid,
          paid_timesnap: timepaid
        }
      })
    },
    confbytime(state){
      return state.confirmlist.sort((dataA, dataB) => {
        return dataA.approvetime < dataB.approvetime
      })
    },
    confagent(state, getters){
      return getters.confbytime.map(({id, agent, client_id, approvetime}) => {
        const exist = state.loadAgents.find(e => e.id === agent)
        return {
          ...exist,
          client_id,
          order_id: id,
          approvetime
        }
      })
    },
    confclient(state, getters){
      return getters.confagent.map(({agtbranch, agtfname, agtlname, id, client_id, order_id, approvetime}) => {
        const exist = state.clients.find(e => e.clientid === client_id)
        return {
          ...exist,
          agtbranch,
          agtfname,
          agtlname,
          agent_id: id,
          order_id,
          approvetime
        }
      })
    },
    confcuts(state, getters){
      return getters.confclient.slice(0, 5)
    },
    conflen(state, getters){
      return getters.confcuts.length
    },
    agentinfo(state){
      return state.choosenagent
    },
    agentorder(state){
      return state.agentorder
    },
    agentclient(state){
      return state.agentclient
    },
    agentorderlen(state, getters){
      return getters.agentorder.length
    },
    agentclientlen(state, getters){
      return getters.agentclient.length
    },
    orderfilterdDate(state){
      return state.orders.sort((dataA, dataB) => {
        return dataA.orddate < dataB.orddate
      })
    },
    featuredorder(state, getters){
      return getters.orderfilterdDate.slice(0, 5)
    },
    loadAgentslength(state){
      return state.loadAgents.length
    },
    orderslength(state){
      return state.orders.length
    },
    clientslength(state){
      return state.clients.length
    },
    goagents(state){
      return state.loadAgents
    },
    featuredagentorder(state){
      return state.agentorder.slice(0, 10)
    },
    featuredagentclient(state){
      return state.agentclient.slice(0, 10)
    },
    listagentpay(state){
      return state.agentfullpayments.map(({agent, cartid, id, item, payer_dat, payid, timepaid}) => {
        const exist = state.orders.find(item => item.orderid === id)
        return {
          ...exist,
          paid_item: item,
          payer_dat,
          paidID: payid,
          paid_timesnap: timepaid,
          cartid
        }
      })
    },
    featuredlistagentpay(state, getters){
      return getters.listagentpay.slice(0,5)
    },
    listagentpayhalf(state){
      return state.agenthalfpayments.map(({agent, display, id, item, payer_dat, payid, timepaid}) => {
        const exist = state.orders.find(item => item.orderid === id)
        return {
          ...exist,
          paymentMode: display,
          paid_item: item,
          payer_dat,
          paidID: payid,
          paid_timesnap: timepaid
        }
      })
    },
    featuredlistagentpayhalf(state, getters){
      return getters.listagentpayhalf.slice(0, 5)
    }
  },
  mutations: {
    detailorder(state, payload){
      const data = state.orders
      const list = []
      for (let i in data){
        if(data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      const bydate = list.sort((mapA, mapB) => {return mapA.ordertime < mapB.ordertime})
      state.orderdetail = bydate
    },
    detailclient(state, payload){
      const data = state.clients
      const list = []
      for (let i in data){
        if (data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      const bydate = list.sort((mapA, mapB) => {return mapA.cltdate < mapB.cltdate})
      state.clientdetail = bydate
    },
    listAgents(state, payload){
      state.loadAgents = payload
    },
    listorders(state, payload){
      state.orders = payload
    },
    listclients(state, payload){
      state.clients = payload
    },
    gotorder(state, payload){
      const data = state.orders
      const list = []
      for (let i in data){
        if(data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      const bydate = list.sort((mapA, mapB) => {return mapA.ordertime < mapB.ordertime})
      state.agentorder = bydate
    },
    gotclient(state, payload){
      const data = state.clients
      const list = []
      for (let i in data){
        if(data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      const bydate = list.sort((mapA, mapB) => {return mapA.cltdate < mapB.cltdate})
      state.agentclient = bydate
    },
    gotfullPayments(state, payload){
      const data = state.paymentfull
      const list = []
      for (let i in data){
        if(data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      state.agentfullpayments = list
    },
    gothalfPayments(state, payload){
      const data = state.paymenthalf
      const list = []
      for (let i in data){
        if (data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      state.agenthalfpayments = list
    },
    gothalffullpayments(state, payload){
      const data = state.paymenthalffull
      const list = []
      for (let i in data){
        if (data[i].agent === payload){
          list.push({...data[i]})
        }
      }
      state.agenthalffullpayments = list
    },
    gotagent(state, payload){
      state.choosenagent = state.loadAgents.find(e => e.id === payload)
    },
    setToken(state, payload){
      state.tokenadmin = payload
    },
    clearToken(state) {
      state.tokenadmin = null
    },
    confirms(state, payload){
      state.confirmlist = payload
    },
    paidfull(state, payload){
      state.paymentfull = payload
    },
    paidhalf(state, payload){
      state.paymenthalf = payload
    },
    paidhalffull(state, payload){
      state.paymenthalffull = payload
    }
  },
  actions: {
    loadhalfpaymentorder({commit}, payload){
      commit('gothalfPayments', payload)
    },
    loadfullpaymentorder({commit}, payload){
      commit('gotfullPayments', payload)
    },
    loaddetailorder({commit}, payload){
      commit('detailorder', payload)
    },
    loaddetailclient({commit}, payload){
      commit('detailclient', payload)
    },
    loadData({commit}){
      async function head(){
        const root = await firebase.database().ref()
        const agents = await root.child('accounts').once('value')
        const dataagents = await agents.toJSON()

        const listagent = []
        for (let i in dataagents){
          listagent.push({id: i, ...dataagents[i]})
        }
        commit('listAgents', listagent)
        const orders = []
        for (let f in listagent){
          await root.child(`orders/${listagent[f].id}`).once('value', function(snapshot) {
            const data = snapshot.val()
            if (data !== null){
              async function gotit(){
                const orderbyclient = await root.child(`orderbyclient/${listagent[f].id}`).once('value')
                const dataclient = await orderbyclient.toJSON()

                for (let d in data){
                  orders.push({agent: listagent[f].id, orderid: d, ...data[d], ...dataclient[d]})
                }
              }
              return gotit().catch(e => console.log('error sa function data sa orders', e))
            }
          })
        }
        const filterdate = orders.sort((mapA, mapB) => {return mapA.orddate > mapB.orddate})
        commit('listorders', filterdate)
        const clients = []
        for (let o in listagent){
          const agent = await root.child(`client/${listagent[o].id}`).once('value')
          const  agentclient = await agent.toJSON()
          for (let n in agentclient){
            clients.push({agent: listagent[o].id, clientid: n, ...agentclient[n]})
          }
        }
        commit('listclients', clients)
        const confirmsdata = []
        for(let i in listagent){
          const conf = await root.child(`appquotation/${listagent[i].id}`).once('value')
          const confdata = await conf.toJSON()
          for (let p in confdata){
            confirmsdata.push({agent: listagent[i].id, id: p, ...confdata[p]})
          }
        }
        commit('confirms', confirmsdata)
        const fullhalfpay = []
        for(let i in listagent){
          const paymenthalffull = await root.child(`payments/${listagent[i].id}/full-half`).once('value')
          const paymenthalffullJSON = await paymenthalffull.toJSON()
          for (let o in paymenthalffullJSON){
            fullhalfpay.push({agent: listagent[i].id, id: o, ...paymenthalffullJSON[o], display: 'fullhalf'})
          }
        }
        const halffullfilterdata = fullhalfpay.sort((mapA, mapB) => {return mapA.timepaid < mapB.timepaid})
        commit('paidhalffull', halffullfilterdata)
        const fullpay = []
        for (let i in listagent){
          const paymentfull = await root.child(`payments/${listagent[i].id}/full`).once('value')
          const paymentfullJSON = await paymentfull.toJSON()
          for (let o in paymentfullJSON){
            fullpay.push({agent: listagent[i].id, id: o, ...paymentfullJSON[o], display: 'full'})
          }
        }
        const fullfilterdata = fullpay.sort((mapA, mapB) => {return mapA.timepaid < mapB.timepaid})
        commit('paidfull', fullfilterdata)
        const halfpay = []
        for (let i in listagent){
          const paymenthalf = await root.child(`payments/${listagent[i].id}/half`).once('value')
          const paymenthalfJSON = await paymenthalf.toJSON()
          for (let o in paymenthalfJSON){
            halfpay.push({agent: listagent[i].id, id: o, ...paymenthalfJSON[o], display: 'half'})
          }
        }
        const halffilterdata = halfpay.sort((mapA, mapB) => {return mapA.timepaid < mapB.timepaid})
        commit('paidhalf', halffilterdata)

      }
      return head().catch(e => console.log('error sa admin/loadData', e))
    },
    fetchAgentid({commit}, payload){
      return new Promise(resolve => {
        commit('gotorder', payload)
        commit('gotclient', payload)
        commit('gotagent', payload)
        commit('gothalffullpayments', payload)
        commit('gothalfPayments', payload)
        commit('gotfullPayments', payload)
        resolve()
      })
    },
    loginAdmin({commit}, payload){
      //console.log(ids.adminKEY)
      return new Promise((resolve, reject) => {
        return this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + ids.adminKEY, {email: payload.email, password: payload.password, returnSecureToken: true})
        .then(d => {
          //console.log(d)
          commit('setToken', d.idToken)
          localStorage.setItem("token", d.idToken)
          localStorage.setItem("tokenExpiration", new Date().getTime() + Number.parseInt(d.expiresIn) * 1000)
          cookie.set("jwt", d.idToken)
          cookie.set("expirationDate", new Date().getTime() + Number.parseInt(d.expiresIn) * 1000)
            resolve()
        })
      })
      .catch(e => {
        reject(e)
      })
    },
    logout({commit}) {
      commit("clearToken");
      cookie.remove("jwt");
      cookie.remove("expirationDate");
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }
  }
}
