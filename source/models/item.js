const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: false
    },
    currency: {
        type: String,
        required: false
    },
    graphic: {
        type: Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item