import firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    perClient: []
  },
  getters: {
    filterdate(state){
      return state.perClient.sort((dateA, dateB) => {
        return dateA.orddate < dateB.orddate
      })
    }
  },
  mutations: {
    perClt(state, payload){
      state.perClient = payload
    }
  },
  actions: {
    getCltOrder({commit, dispatch, getters, rootGetters}, payload){
      const agent = rootGetters.agentKey
      async function getData(){
        let loads = []
        const rooter = await firebase.database().ref()
        const data = await rooter.child(`orders/${agent}`).once('value', snap => {
          const inside = snap.val()
          for(let n in inside){
            if(inside[n].cltid == payload){
              loads.push({id: n, ...inside[n]})
            }
          }
        })
        commit('perClt', loads)
      }
      return getData().catch(e => console.log('error on getCltOrder', e))
    },
    convertpfd({commit, dispatch, getters, rootGetters}){
      return new Promise((resolve, reject) => {
        const agent = rootGetters.agentKey
        firebase.database().ref(`order/${agent}`)
      })

    }
  }
}
