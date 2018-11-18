import firebase from 'firebase'
import configFirebase from './configFirebase'

if(!configFirebase){
  throw new Error('missing ./configFirebase.js config.')
}


export default function({store, redirect}) {
  async function authGuard(){

    if (!firebase.apps.length) {
      await firebase.initializeApp(configFirebase)
    }
    await firebase.auth().onAuthStateChanged((user) => {
       if (user){
         store.commit('setUser', user)
       }
     })
  }
  return authGuard().catch(e => console.log('naai error sa firebase: ', e))

}
