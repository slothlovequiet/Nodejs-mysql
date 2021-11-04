const express = require('express')
const app = express()
const port = process.env.PORT || 3600
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const routes = require('./settings/route')
routes(app)

app.listen(port, () => {
   console.log(`App listen on port ${port}`)
})