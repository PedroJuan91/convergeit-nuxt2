import firebase from 'firebase'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    clients: []
  },
  getters: {
    loadClients(state){
      return state.clients
    }
  },
  mutations: {
    createClient(state, client){
      state.clients.push(client)
    },
    loadClients(state, payload){
      state.clients = payload
    }
  },
  actions: {
    createNew({commit, rootGetters}, agentsClient) {
      const agent = rootGetters.agentKey
      return new Promise((resolve, reject) => {
        firebase.database().ref(`client/${agent}`).push(agentsClient)
        .then(data => {
          //console.log(data)
          const key = data.key
          commit('createClient', {id: key, ...data})
          resolve()
        }).catch(e => reject(e))
      }).catch(e => reject(e))
    },
    loadClients({commit, rootGetters}){
      return new Promise((resolve, reject) => {
        const agent = rootGetters.agentKey
        firebase.database().ref(`client`).child(agent).once('value')
        .then(data => {
          const obj = data.val()
          const clients = []
          for(let key in obj){
            clients.push({
              id: key,
              ...obj[key]
            })
          }
          commit('loadClients', clients)
          resolve()
        })
       .catch(e => reject(e))
      })
    }
  }
}
