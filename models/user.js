const { Schema, model } = require('mongoose')
let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    }, 
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
    },
    {
    toJSON: {
        virtuals: true,
    },
})

userSchema
    .virtual ('friendCount')
    .get (function () {
        return this.friend.length
    })

    const User = model ('user', userSchema)

    module.exports = User