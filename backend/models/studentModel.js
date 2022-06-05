const mongoose = require( 'mongoose' )

const studentSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Please provide the name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    branch: {
        type: String, required: [true, "Branch required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    participatedEvents: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
}, {
    timestamps: true
} )

module.exports = mongoose.model( 'Student', studentSchema )