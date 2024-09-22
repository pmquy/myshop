require('dotenv').config()
require('./configs/mongodb').connect()
require('./configs/redis').connect()
require('./configs/rabbitmq').connect()

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('cors')({ credentials: true, origin: [process.env.FRONTEND_URL, 'https://www.tieminnhatho.com', 'https://lokikurri-myshop.vercel.app', 'https://my-shop-git-dev-pmquys-projects.vercel.app'] }))
app.use(require('morgan')('tiny'))
app.use(require("cookie-parser")())

app.get("/", (req, res) => res.send("Ping"))
app.use(require('./routers'))

const { handle404, handleError } = require('./middlewares')
app.use(handle404)
app.use(handleError)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("User service is running on port", PORT))

