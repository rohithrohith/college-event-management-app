const mongoose = require( 'mongoose' )

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add the title'],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model( 'Event', eventSchema )