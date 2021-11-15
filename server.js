const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 8888

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const routes = require('./settings/route')
routes(app)

app.listen(port, () => {
   console.log(`App listen on port ${port}`)
})