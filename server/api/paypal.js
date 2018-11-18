const paypal = require('paypal-rest-sdk')
const firebase = require('firebase')
const ids = require('../../keys')
const express = require('express')
const routes = express.Router()
const app = express()
const axios = require('axios')
// var xml = new XMLHttpRequest()

app.globalamount = 0
app.globelink = ''

function splitting(key, rex){
  const comp = key.split(rex)
  const res = [comp.shift()]
  if(comp.length){
    res.push(comp.join(rex))
  }
  return res
}
function modedat(data){
  if (data === '001'){
    return 'half'
  }
  if (data === '002'){
    return 'full'
  }
}
//paypal config
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': ids.clientID,
  'client_secret': ids.clientSec
})
const fireconf = {
   apiKey: ids.firesyskey,
   authDomain: ids.fireauthdom,
   databaseURL: ids.firedatadom

}
firebase.initializeApp(fireconf)



  routes.post('/', (req, res) => {
    app.globalamount = req.body.amount
    app.globelink = req.body.id
    paypal.payment.create(req.body.data, function (error, payment) {
    if (error) {
        throw error
    } else {
        res.send(payment)
      }
    })
  })

  routes.get('/success', (req, res) => {
    const payerID = req.query.PayerID
    const paymentID = req.query.paymentId
    let pay_json = {
      "payer_id": payerID,
        "transactions": [{
          "amount": {
              "currency": "PHP",
              "total": `${app.globalamount}.00`
          }
      }]
    }
    paypal.payment.execute(paymentID, JSON.stringify(pay_json), function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
        const link = []
        const links = payment.links
        for (let n in links.length){
          link.push({...links[n]})
        }
        const cartid = payment.cart
        const payid = payment.id
        const timstamp = new Date().toISOString()
        const payer = {...payment.payer}
        const tansact = {...payment.transactions[0]}
        const mode = modedat(payment.transactions[0].item_list.items[0].sku)
        const splitKEY = splitting(app.globelink, '-')
        const root = firebase.database().ref()
        //store data in database payments and update hasPaid and modepay
        if(payment.state === 'approved'){
          if (mode === 'half'){
            root.child(`payments/${splitKEY[0]}/${mode}/-${splitKEY[1]}`).set({payid: payid, cartid: cartid, timepaid: timstamp, payer_dat: payer, item: tansact, haspaidfull: false})
          }
          if (mode === 'full'){
            root.child(`payments/${splitKEY[0]}/${mode}/-${splitKEY[1]}`).set({payid: payid, cartid: cartid, timepaid: timstamp, payer_dat: payer, item: tansact})
          }

          root.child(`orderbyclient/${splitKEY[0]}/-${splitKEY[1]}`).update({hasPaid: true, modepay: mode})
          res.send(`successful paid <a href="${ids.host}">return home page</a>`)
        }else{
          res.send(`Unable to pay properly <a href="${ids.host}/order/${app.globelink}">return to page</a>`)
        }
      }
    });

  })

  routes.get('/cancel', (req, res) => {
    res.send(`<p>You have cancelled the payment</p> <a href="${ids.host}/order/${app.globelink}" > return to page</a>`)
  })

  routes.get('/success-half', (req, res) => {
    const payerID = req.query.PayerID
    const paymentID = req.query.paymentId
    let pay_json = {
      "payer_id": payerID,
        "transactions": [{
          "amount": {
              "currency": "PHP",
              "total": `${app.globalamount}.00`
          }
      }]
    }
    paypal.payment.execute(paymentID, JSON.stringify(pay_json), function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
        const link = []
        const links = payment.links
        for (let n in links.length){
          link.push({...links[n]})
        }
        const cartid = payment.cart
        const payid = payment.id
        const timstamp = new Date().toISOString()
        const payer = {...payment.payer}
        const tansact = {...payment.transactions[0]}
        const mode = modedat(payment.transactions[0].item_list.items[0].sku)
        const splitKEY = splitting(app.globelink, '-')
        const root = firebase.database().ref()
        //store data in database payments and update hasPaid and modepay
        if(payment.state === 'approved'){
          root.child(`payments/${splitKEY[0]}/full-half/-${splitKEY[1]}`).set({payid: payid, cartid: cartid, timepaid: timstamp, payer_dat: payer, item: tansact})
          root.child(`orderbyclient/${splitKEY[0]}/-${splitKEY[1]}`).update({hasPaid: true, modepay: 'full'})
          root.child(`payments/${splitKEY[0]}/half/-${splitKEY[1]}`).update({haspaidfull: true})
          res.send(`successful paid <a href="${ids.host}">return home page</a>`)
        }else{
          res.send(`Unable to pay properly <a href="${ids.host}/order/${app.globelink}">return to page</a>`)
        }
      }
    })
  })

module.exports = routes
