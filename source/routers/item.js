const express = require('express')
const Item = require('../models/item')

const router = new express.Router()

router.get('/items', async (req, res) => {

    const task = Item.findById({ _id: '23131' })

    try {
        // // Website you wish to allow to connect
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        res.status(200).send({str: 'I\'m just dumb, just happy righ now'})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router