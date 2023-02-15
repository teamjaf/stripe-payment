if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'.env'});
}

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

//console.log(stripePublicKey, "  ", stripeSecretKey)

const express = require('express')
const app = express()
const fs = require('fs')

app.get('/store', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        res.render('store.ejs', {
          stripePublicKey: stripePublicKey,
          items: JSON.parse(data)
        })
      }
    })
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(4000)

