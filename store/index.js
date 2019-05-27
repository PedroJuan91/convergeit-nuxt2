import firebase from 'firebase'
import vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import order from './modules/order'
import product from './modules/product'
import client from './modules/client'
import render from './modules/rendering'
import admin from './modules/admin'
import edit from './modules/edits'
import report from './modules/report'


function createNewAccount (user, account) {
  return firebase.database().ref(`accounts/${user.user.uid}`).set({...account})
}

const createVuex = () => {
  return new vuex.Store({
    modules:{
      order,
      product,
      client,
      render,
      admin,
      edit,
      report
    },
    getters: {
      agentKey(state) {
        if(state.user != null){
          return state.user.uid
        }
      },
      isAuthenticated (state) {
        return !!state.user
      },
      orderProd(state, getters, rootState){
        return (id) => {
          return rootState.product.items.find((prod) => {
            return prod.id === id
          })
        }
      },
      profileOrder(state, getters, rootState, rootGetters){
        return (id) => {
          return rootGetters['render/order'].find((order) => {
            return order.id === id
          })
        }
      },
      profileClient(state, getters, rootState, rootGetters) {
        return (agentID) => {
          return rootState.client.clients.find((agent) => {
            return agent.id === agentID
          })
        }
      },
      profileProduct(state, getters, rootState, rootGetters){
        return (prodID) => {
          return rootState.product.items.find((product) => {
            return product.id === prodID
          })
        }
      },
      halffullpay(state, getters, rootState, rootGetters){
        return (id) => {
          return rootState.render.half_fullpayments.find(item => item.id === id).timepaid
        }
      },
      adminhalfpay(state, getters, rootState, rootGetters){
        return (id) => {
         return rootState.admin.paymenthalffull.find(item => item.id === id).timepaid
        }
      }
    },
    mutations:{
      ...firebaseMutations,
      setUser (state, user) {
        state.user = user
        return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
      }
    },
    actions:{
      setAccountRef: firebaseAction(({ bindFirebaseRef }, path) => {
        return bindFirebaseRef('account', firebase.database().ref(path))
      }),
      resetUser ({
        state
      }) {
        state.user = null
      },
      userCreate ({ state }, account) {
      //  console.log(account)
        return firebase.auth().createUserWithEmailAndPassword(account.agent.agtemail, account.pass)
        .then(res => {
            //console.log(res.user.uid)
          return createNewAccount(res, account.agent)
        })
      },
      userLogin ({ state }, account) {
        return firebase.auth()
          .signInWithEmailAndPassword(account.email, account.password)
          .then((user) => {
            //const auth = user.user.refreshToken
            //console.log(auth)
            //cookie.set('auth', auth)
           this.dispatch('setUser', user)
          })
      },
      userLogout ({ state }) {
        return new Promise((resolve, reject) => {
          firebase.auth()
            .signOut()
            .then(() => {
              this.dispatch('resetUser')
              resolve()
            })
            .catch(e => reject(e))
        })
      },
      userUpdate ({ state }, newData) {
        return firebase.database().ref(`accounts/${state.user.uid}`).update({
          displayName: newData.displayName
        })
      },
      userUpdateImage ({ state }, image) {
        return firebase.database().ref(`accounts/${state.user.uid}`).update({
          image
        })
      },
      theLoaders({commit, dispatch}) {
        async function load() {
          await dispatch('product/loadProd')
          await dispatch('client/loadClients')
          await dispatch('order/loadOrders')
          await dispatch('order/loadorderbyclient')
          await dispatch('render/projectinfo'),
          await dispatch('render/projectpayment'),
          await dispatch('render/halfFullpayment')
        }
        return load()
      },
      cltList({commit, dispatch}, payload) {
        async function load(){
          await dispatch('report/getCltOrder', payload)
        }
        return load()
      }
    },
    state: {
      account: null,
      user: null
    }
  })
}

export default createVuex
