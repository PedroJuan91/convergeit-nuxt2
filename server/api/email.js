const email = require('@sendgrid/mail')
const express = require('express')
const ids = require('../../keys')
const routes = express.Router()
//instatce for sendgrid email
email.setApiKey(ids.askey)


routes.post('/', (req,res) => {
  const link = ids.host + 'order/' + req.body.api
  const mailOptions = {
       to: req.body.send,
       from: 'non-sender@convergeit.com',
       subject: 'Converge IT Solutions || Quotation Report',
       html: `<h1>Thank You for trusting our services</h1><p>Please click at the link for quotation viewing: </p><a href="${link}"> Click here! </a>`
     }
  email.send(mailOptions, (error, result) => {
    if(error){
      console.log('wla na send chuy!! tanga ang computer', error)
      res.status(402).json({'error': 'kuyawa nimo oi!! wla jud nag padayun'})
    }else{
      res.status(200).json({message: 'horray'})
    }
  })

})


module.exports = routes
