const express = require('express')
const cors = require('cors')
// Require db/mongoose so tests can have access
require('./db/mongoose')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')

const itemizerApp = express()

// DELETE THIS COMMETNS
itemizerApp.use(express.json())
let corsOptions = { origin: 'http://localhost:4200', credentials: false }
itemizerApp.use(cors(corsOptions))
itemizerApp.options('*', cors())
itemizerApp.use(userRouter)
itemizerApp.use(itemRouter)

module.exports = itemizerApp