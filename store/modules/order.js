import firebase from 'firebase'
import axios from 'axios'
export default {

  namespaced: true,

  state: {
    addedcart: [],
    orderlist: [],
    orderlistbyclient: [],
    editaddedcart: []
  },
  getters: {
    myShopping(state, getters){
      return getters.viewCheckoutList
    },
    clientsOfAgent(state,getters,rootState) {
      return rootState.client.clients
    },
      //send details when clicked
    viewCheckoutList(state, getters, rootState) {
      return state.addedcart.map(({id, itemquantity}) => {
        const exist = rootState.product.items.find(p => p.id === id)
        return {
          ...exist,
          itemquantity
        }
      })
    },
    //determine the number in the cart
    checkoutLists(state, getters) {
      return getters.viewCheckoutList.length
    },
    editviewCheckoutList(state, getters, rootState) {
      return state.editaddedcart.map(({id, itemquantity}) => {
        const exist = rootState.product.items.find(p => p.id === id)
        return {
          ...exist,
          itemquantity
        }
      })
    }

  },
  mutations: {
    addedcart(state, payload){
      const record = state.addedcart.find(p => p.id === payload.id)
      payload.itemquantity = 1
      if(!record){
        state.addedcart.push({...payload})
      } else {
        console.log('this product exist, choose another one')
      }
    },
    incrementValue(state, id){
      const item = state.addedcart.find(p => p.id === id)
      item.itemquantity++
    },
    decrementValue(state, id) {
      const item = state.addedcart.find(p => p.id === id)
      item.itemquantity--
    },
    removeProd(state, index) {
      const item = state.addedcart.splice(index, 1)
    },
    saveOrder(state, payload) {
      state.orderlist.push(payload)
    },
    myOrders(state, order){
      state.orderlist = order
    },
    saveorderbycustomer(state, payload){
      state.orderlistbyclient.push(payload)
    },
    myorderbycustomer(state, payload){
      state.orderlistbyclient = payload
    },
    editaddedcart(state, payload){
      const record = state.editaddedcart.find(p => p.id === payload.id)
      payload.itemquantity = 1
      if(!record){
        state.editaddedcart.push({...payload})
      } else {
        console.log('this product exist, choose another one')
      }
    },
    preLoadEditAddtocart(state, payload){
      for(let i in payload){
        const record = state.editaddedcart.find(p => p.id === payload[i].id)
        delete payload[i].prodimg
        if(!record){
          state.editaddedcart.push({...payload[i]})
        }
      }
    },
    editincrementValue(state, id){
      const item = state.editaddedcart.find(p => p.id === id)
      item.itemquantity++
    },
    editdecrementValue(state, id) {
      const item = state.editaddedcart.find(p => p.id === id)
      item.itemquantity--
    },
    editremoveProd(state, index) {
      const item = state.editaddedcart.splice(index, 1)
    },


  },
  actions: {
    editinvermentValue({commit}, payload) {
      return new Promise((res, rej) => {
        commit('editincrementValue', payload)
        res()
      })
    },
    editdecrementValue({commit}, payload) {
      return new Promise((res, rej) => {
        commit('editdecrementValue', payload)
        res()
      })
    },
    editremoveProd({commit}, payload){
      commit('editremoveProd', payload)
    },
    preLoadEditProd({commit}, payload){
      commit('preLoadEditAddtocart', payload)
    },
    editcart({commit}, payload){
      commit('editaddedcart', payload)
    },
    addtocart({commit}, payload){
      commit('addedcart', payload)
    },
    invermentValue({commit}, payload) {
      return new Promise((res, rej) => {
        commit('incrementValue', payload)
        res()
      })
    },
    decrementValue({commit}, payload) {
      return new Promise((res, rej) => {
        commit('decrementValue', payload)
        res()
      })
    },
    removeProd({commit}, payload){
      commit('removeProd', payload)
    },
    saveOrder({commit, dispatch, getters, rootGetters}, payload){
      const agentid = rootGetters.agentKey
      const cltID = payload.cltid
      async function goSave(client, agent, payload){
        const order = await firebase.database().ref(`orders/${agent}`).push(payload)
        commit('saveOrder', {...payload, id: order.key})
        const clientsorderdetail = {
          ordertime: payload.orddate,
          hasPaid: false,
          cltid: client,
          confirmquotation: false,
          modepay: 'none'
        }
        const orderbyclient = await firebase.database().ref(`orderbyclient/${agent}`).child(order.key).set({...clientsorderdetail})
        commit('saveorderbycustomer', {...clientsorderdetail, id: order.key})
        //await axios.post(process.env.host +'send-mail', {sender: payload.ordsend, apikey: order.key})
      }
      return goSave(cltID,agentid,payload)

    },
    loadOrders({commit, dispatch, getters, rootGetters}) {
      return new Promise((resolve, reject) => {
        const agent = rootGetters.agentKey
        firebase.database().ref(`orders/${agent}`).once('value')
        .then(data => {
          const obj = data.val()
          //console.log(data.ref)
          const order = []
          //console.log(Object.keys(obj))
          for (let i in obj){
            order.push({
              id: i,
              ...obj[i]
            })
          }

          commit('myOrders', order)
          resolve()
        }).catch(e => reject(e))
      })
    },
    loadorderbyclient({commit, dispatch, getters, rootGetters}){
      const agent = rootGetters.agentKey
      return new Promise((resolve, reject) => {
        firebase.database().ref(`orderbyclient/${agent}`).once('value')
        .then((data) => {
          const obj = data.val()
          const orderbyclient = []
          for (let i in obj){
            orderbyclient.push({id: i, ...obj[i]})
          }
          commit('myorderbycustomer', orderbyclient)
          resolve()
        }).catch(e => reject(e))
      })
    },
    sendemail({commit}, payload){
    return new Promise((resolve, reject) => {
       axios.post(process.env.host + 'send-email', {send: payload.send, api: payload.api})

       resolve()
      }).catch(e => reject(e))
    },
    approveQuotation({commit}, payload){
      function splits(data, res){
        const comp = data.split(res)
	const result = [comp.shift()]
	if(comp.length) {
	  result.push(comp.join(res))
	}
	return result
      }
      const keysplit = splits(payload.id, '-')
      const agent = keysplit[0]
      const order = `-${keysplit[1]}`
      return data().catch(e => console.log('you got a error: ', e))

      async function data(){
        const root = await firebase.database().ref()
        const orderbyclient = await root.child(`orderbyclient/${agent}/${order}`)
        await orderbyclient.update({confirmquotation: true})
        await root.child(`appquotation/${agent}/${order}`).set({
          approvetime: new Date().toISOString(),
          client_email: payload.email,
          client_id: payload.clientid
        })
      }
    },
    clientpayspaypal({commit}, payload){
      const keysplit = payload.id.split('-')
      const agent = keysplit[0]
      const order = `-${keysplit[1]}`
      return this.$axios.$post(process.env.host + 'pay-paypal', {data: payload.data, id: payload.id, amount: payload.amount})
    }
  }


}
