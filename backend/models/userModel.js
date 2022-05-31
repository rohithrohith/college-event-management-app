const mongoose = require( 'mongoose' )

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an E-mail"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    role: {
        type: String,
        default: "MODERATOR"
    },
    branch: {
        type: String
    }
}, {
    timestamps: true
} )

module.exports = mongoose.model( 'User', userSchema )