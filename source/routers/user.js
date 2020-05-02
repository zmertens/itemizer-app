const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {

    await User.findById({ _id: '23232' })

    try {
        res.status(201).send({token: "I am a just lad"})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router