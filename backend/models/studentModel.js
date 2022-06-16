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
    role: {
        type: String,
        default: "STUDENT"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    participatedEvents: {
        type: Array,
        default: null
    },
}, {
    timestamps: true
} )

module.exports = mongoose.model( 'Student', studentSchema )