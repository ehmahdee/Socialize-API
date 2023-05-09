const { Schema, model } = require('mongoose')
const reactionSchema = require('./reaction.js')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString(),
    },
})