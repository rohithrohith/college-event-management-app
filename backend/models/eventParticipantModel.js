const mongoose = require( 'mongoose' )

const eventParticipantsSchema = mongoose.Schema( {
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide student-ID"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide event-ID"]
    }
} )

module.exports = mongoose.model( 'EventParticipants', eventParticipantsSchema )