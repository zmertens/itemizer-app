const express = require('express')

const router = new express.Router()

router.post('/users', async (req, res) => {

    try {
        res.status(201).send({token: "I am a just lad"})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router