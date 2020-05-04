const express = require('express')
// Require db/mongoose so tests can have access
require('./db/mongoose')
const userRouter = require('./routers/user')
// const itemRouter = require('./routers/item')

const itemizerApp = express()

itemizerApp.use(express.json())
itemizerApp.use(userRouter)
// itemizerApp.use(itemRouter)

module.exports = itemizerApp