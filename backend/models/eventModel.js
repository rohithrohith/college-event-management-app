const mongoose = require( 'mongoose' )

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add the title'],
        },
        description: {
            type: String,
            required: [true, "Please provide the description"]
        },
        participants: {
            type: Object,
            default: {
                total: 0,
                CSE: 0,
                ISE: 0,
                ECE: 0,
                ME: 0,
                AE: 0,
                MT: 0,
                EEE: 0,
                "AI/ML": 0,
                CIV: 0,
            }
        },
        thumbnail: {
            data: { type: Buffer, required: [true, "Please provide thumbnail"] },
            contentType: String,
            name: String
        },
        lastDate: {
            type: Date,
            required: [true, "Please provide last date to register"]
        },
        eventOn: {
            type: Date,
            required: [true, "Please provide Event date"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model( 'Event', eventSchema )