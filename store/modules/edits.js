import firebase from 'firebase'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    orderEdit({commit, dispatch, getters, rootGetters}, payload){
      const agent = rootGetters.agentKey
      const orderid = payload.orderid
      const clientsorderdetail = {
        ordertime: payload.orddate,
        hasPaid: false,
        cltid: payload.cltid,
        confirmquotation: false,
        modepay: 'none'
      }
      delete payload.orderid
      async function data(){
        const root = await firebase.database().ref()
      //  await root.child(`orders/${agent}/`)
        await root.child(`orders/${agent}/${orderid}`).update({...payload})
        await root.child(`orderbyclient/${agent}/${orderid}`).update({...clientsorderdetail})
      }
      return data()

    },
    productEdit({commit, dispatch, getters, rootGetters, rootState}, payload){
        const agent = rootGetters.agentKey
        const prodid = payload.prodid
        delete payload.prodid
        async function data(){
          const root = await firebase.database().ref()
          await root.child(`product/${prodid}`).update({...payload})
        }
        return data()
    },
    clientEdit({commit, dispatch, getters, rootGetters}, payload){
      const agent = rootGetters.agentKey
      const cltid = payload.cltid
      delete payload.cltid
      async function data(){
        const root = await firebase.database().ref()
        await root.child(`client/${agent}/${cltid}`).update({...payload})
        await root.child(`orders/${agent}`).once('value', snap => {
          const datKey = Object.keys(snap.val())
          const data = {}
          for (let i in snap.val()){
            if(snap.val()[i].cltid == cltid){
              data[`orders/${agent}/${i}/address`] = payload.cltaddress
              data[`orders/${agent}/${i}/cltimg`] = payload.cltimg
              data[`orders/${agent}/${i}/ordnameto`] = payload.cltname
              data[`orders/${agent}/${i}/ordsend`] = payload.cltemail
            }
          }
          return root.update(data)
        })
      }
      return data()
    }
  }

}
