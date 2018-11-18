import firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    listedProducts(state){
      return state.items
    }
  },
  mutations: {
    newitem(state, prod){
      state.items.push(prod)
    },
    loaditem(state, prod){
      state.items = prod
    }
  },
  actions: {
    inputNewProduct ({commit}, product) {
      return new Promise ((resolve, reject) => {
        firebase.database().ref(`product`).push(product)
        .then(data => {
          const key = data.key
          commit('newitem', {id: key, ...data})
          resolve()
        })
       .catch(e => reject(e))
      })
    },
    loadProd({commit, rootGetters}){
      return new Promise((resolve, reject) => {
        //const agent = rootGetters.agentKey
        // console.log(firebase.database().ref(process.env.baseUrl +'product'))
        // console.log(firebase.auth().currentUser.refreshToken)
        firebase.database().ref('product').once('value')
        .then(data => {
          //console.log(data.val())
          const obj = data.val()
          const prod = []
          for(let key in obj){
            prod.push({
              id: key,
              ...obj[key]
            })
          }
          commit('loaditem', prod)
          resolve()
        })
        .catch(e => reject(e))
      })
    }
  }


}
