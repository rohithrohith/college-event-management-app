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