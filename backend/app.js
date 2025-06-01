const express = require('express')

const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const ErrorHandler = require('./middleware/error')

app.use(express.json())
app.use('/test',(req,res) => {
    res.send("hello world")
})

app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
}))

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env"
    })
}

app.use(ErrorHandler)

module.exports = app
