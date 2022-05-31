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
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model( 'Event', eventSchema )