const express = require('express')
const app = express()
const route = require('./routes/route')
const multer = require('multer')

app.use(multer().any())

app.use('/', route)

const port = process.env.port || 3000;
app.listen(port , function (){

console.log(`express app is running on port ${port}`)

})