const express = require('express')
const Item = require('../models/item')
const auth = require('../middleware/auth')

const router = new express.Router()

/**
 * The user is automatically chained to this POST request
 * from the 'auth' middleware callback function
 */
router.post('/items', auth, async (req, res) => {

    const item = new Item({
        ...req.body,
        owner: req.user._id
    })

    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/items', auth, async (req, res) => {

    try {
        await req.user.populate({
            path: 'items'
        }).execPopulate()
        res.send(req.user.items)
    } catch (e) {
        res.status(500).send('DB error - could not get query items')
    }
})

router.get('/items/:id', auth, async (req, res) => {

    try {
        item = await Item.findOne({ _id: req.params.id, owner: req.user._id })
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {
        res.status(500).send('DB error - could not get query items')
    }
})

router.patch('/items/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'price']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
   
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const item = await Item.findById({ _id: req.params.id, owner: req.user._id })
        if (!item) {
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/items/:id', auth, async (req, res) => {
    try {
        const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!item) {
            res.status(404).send('Item with id ' + req.params.id + ' not found')
        }
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router