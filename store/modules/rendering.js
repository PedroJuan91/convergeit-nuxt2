import firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    quotatelist: [],
    fullpaymentslist: [],
    halfpaymentslist: [],
    half_fullpayments: []

  },
  getters: {
    featuredhalffullPayOrder(state, getters){
      return getters.halffullOrderPay.slice(0, 5)
    },
    halffullOrderPaylen(state, getters){
      return getters.halffullOrderPay.length
    },
    halffullOrderPay(state, getters, rootState){
      return getters.halffullpaydate.map(({id, cartid, item, timepaid, payid, payer_dat}) => {
        const exist = rootState.order.orderlist.find(e => e.id === id)
        return {
          ...exist,
          paid_cart: cartid,
          paid_item: item,
          paid_time: timepaid,
          paid_id: payid,
          paid_payer: payer_dat
        }
      })
    },
    halffullpaydate(state){
      return state.half_fullpayments.sort((mapA, mapB) => {
        return mapA.timepaid < mapB.timepaid
      })
    },
    featuredhalfPayOrder(state, getters){
      return getters.halfPayOrder.slice(0, 5)
    },
    featuredfullPayOrder(state, getters){
      return getters.fullPayOrder.slice(0, 5)
    },
    halfPayOrderlen(state, getters){
      return getters.halfPayOrder.length
    },
    halfPayOrder(state, getters, rootState){
      return getters.filterhalfpaymentdate.map(({id, cartid, item, timepaid, payid, payer_dat, haspaidfull}) => {
        const exist = rootState.order.orderlist.find(e => e.id === id)
        return {
          ...exist,
          paid_cart: cartid,
          paid_item: item,
          paid_time: timepaid,
          paid_id: payid,
          paid_payer: payer_dat,
          paid_other_half: haspaidfull
        }
      })
    },
    filterhalfpaymentdate(state){
      return state.halfpaymentslist.sort((mapA, mapB) => {
        return mapA.timepaid < mapB.timepaid
      })
    },
    filterpaymentsdate(state){
      return state.fullpaymentslist.sort((mapA, mapB) => {
        return mapA.timepaid < mapB.timepaid
      })
    },
    fullPayOrderlen(state, getters){
      return getters.fullPayOrder.length
    },
    fullPayOrder(state, getters, rootState){
      return getters.filterpaymentsdate.map(({id, cartid, item, timepaid, payid, payer_dat }) => {
        const exist = rootState.order.orderlist.find(e => e.id === id)
        return {
          ...exist,
          paid_cart: cartid,
          paid_item: item,
          paid_time: timepaid,
          paid_id: payid,
          paid_payer: payer_dat
        }
      })
    },
    featuredApproveQuotation(state, getters){
      return getters.quotationlatestclient.slice(0, 10)
    },
    quotationlatestclient(state, getters, rootState){
      return getters.quotationlatest.map(({client_id, approvetime}) => {
         const exist = rootState.client.clients.find(clt => clt.id === client_id)
         return {
           ...exist,
          approvetime
         }
      })
    },
    quotationlatest(state){
      return state.quotatelist.sort((dataA, dataB) => {
        return dataA.approvetime < dataB.approvetime
      })
    },
    quotationlen(state){
      return state.quotatelist.length
    },
    listedClient(state, getters, rootState){
      return rootState.client.clients.length
    },
    listedOrder(state, getters, rootState){
      return rootState.order.orderlist.length
    },
    //client render
    clientCopy(state, getters, rootState, rootGetters){
      return rootState.client.clients.sort((clientA, clientB) => {
        return clientA.cltdate < clientB.cltdate
      })
    },
    featuredClients(state, getters) {
      return getters.clientCopy.slice(0, 3)
    },
    //order render
    order(state, getters, rootState){
      return rootState.order.orderlist.map(({id, cltimg, itemstotal, ordnameto, ordprodlist, ordsend, address}) => {
        const have = rootState.order.orderlistbyclient.find(p => p.id === id)
        return {
          ...have,
          cltimg,
          itemstotal,
          ordnameto,
          ordprodlist,
          ordsend,
          address
        }
      })
    },
    orderCopy(state, getters, rootState){
      return rootState.order.orderlist.sort((orderA, orderB) => {
        return orderA.orddate < orderB.orddate
      })
    },
    orderfullCopy(state, getters, rootState, rootGetters){
      return getters.order.sort((ordA, ordB) => {
        return ordA.ordertime < ordB.ordertime
      })
    },
    featuredOrder(state, getters) {
      return getters.orderCopy.slice(0, 3)
    }
  },
  mutations: {
    loadquotation(state, payload){
      state.quotatelist = payload
    },
    loadpayments(state, payload){
      state.fullpaymentslist = payload
    },
    loadhalfpayments(state, payload){
      state.halfpaymentslist = payload
    },
    loadhalffullpayment(state, payload){
      state.half_fullpayments = payload
    }
  },
  actions: {
    projectinfo({commit, dispatch, getters, rootGetters}){
      const agent = rootGetters.agentKey
      async function data(){
        const root = await firebase.database().ref()
        const qagent = await root.child(`appquotation/${agent}`).once('value')
        const datalog = await qagent.toJSON()
        const list = []
        for (let i in datalog){
          list.push({id: i, ...datalog[i]})
        }
        commit('loadquotation', list)
      }
      return data().catch(e => console.log('nag error sa projectinfo', e))
    },
    removeorder({commit, dispatch, getters, rootGetters}, payload){
      const agent = rootGetters.agentKey
      async function data(){
        const root = await firebase.database().ref()
        await root.child(`orders/${agent}/${payload}`).remove()
        await root.child(`orderbyclient/${agent}/${payload}`).remove()
      }
      return data().catch(e => console.log('nagaerror sa delete data', e))
    },
    projectpayment({commit, dispatch, getters, rootGetters}){
      const agent = rootGetters.agentKey
      async function paid(){
        const root = await firebase.database().ref()
        const fullpayments = await root.child(`payments/${agent}/full`).once('value')
        const fullpaymentsJSON = await fullpayments.toJSON()      
        const fullpaylist = []
        for (let i in fullpaymentsJSON){
          fullpaylist.push({...fullpaymentsJSON[i], id: i})
        }
        commit('loadpayments', fullpaylist)
        const halfpayments = await root.child(`payments/${agent}/half`).once('value')
        const halfpaymentsJSON = await halfpayments.toJSON()
        const halfpaylist = []
        for(let o in halfpaymentsJSON){
          halfpaylist.push({...halfpaymentsJSON[o], id: o})
        }
        commit('loadhalfpayments', halfpaylist)
      }
      return paid().catch(e => console.log('nag error sa projectpayment', e))
    },
    halfFullpayment({commit, dispatch, getters, rootGetters}){
      const agent = rootGetters.agentKey
      async function data(){
        const root = await firebase.database().ref()
        const halffullpayments = await root.child(`payments/${agent}/full-half`).once('value')
        const halffullpaymentsJSON = await halffullpayments.toJSON()
        const list = []
        for (let i in halffullpaymentsJSON){
          list.push({id: i, ...halffullpaymentsJSON[i]})
        }
        commit('loadhalffullpayment', list)
      }
      return data().catch(e => console.log('nag error sa halfFullpayment', e))
    }
  }
}
