require('dotenv').config()
require('./configs/mongodb').connect()

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('cors')())
app.use(require('morgan')('tiny'))

app.get("/", (req, res) => res.send("Ping"))
app.use(require('./routers'))

const { handle404, handleError } = require('./middlewares')
app.use(handle404)
app.use(handleError)

const PORT = process.env.PORT || 5003
app.listen(PORT, () => console.log("Cart service is running on port", PORT))

