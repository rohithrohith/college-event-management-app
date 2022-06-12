const mongoose = require( 'mongoose' )

const otpSchema = mongoose.Schema( {
    otp: {
        type: Number,
        required: [true, "Otp is required"]
    },
    email: {
        type: String,
        required: [true, "E-mail is required"]
    }
} )

module.exports = mongoose.model( 'SentOtp', otpSchema )