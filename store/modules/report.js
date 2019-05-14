import firebase from 'firebase'
import pdfjs from 'jspdf'
export default {
  namespaced: true,
  state: {
    perClient: []
  },
  getters: {

  },
  mutations: {},
  actions: {
    convertpfd({commit, dispatch, getters, rootGetters}){
      return new Promise((resolve, reject) => {
        const agent = rootGetters.agentKey
        firebase.database().ref(`order/${agent}`)
      })

    }
  }
}
