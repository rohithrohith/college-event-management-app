const asyncHandler = require( 'express-async-handler' )

const Event = require( '../models/eventModel' )
const EventParticipants = require( '../models/eventParticipantModel' )
const Student = require( '../models/studentModel' )

// @route GET /api/events
const getEvents = asyncHandler( async ( req, res ) => {
    const events = await Event.find()
    res.status( 200 ).json( { events, user: req.user } )

} )

// @route PUT /api/events
const insertEvent = asyncHandler( async ( req, res ) => {
    const { title, description, eventOn, lastDate } = req.body
    if ( !title || !description || !eventOn || !lastDate ) {
        res.status( 400 )
        throw new Error( 'Please enter all attributes!' )
    }
    const event = await Event.create( {
        title,
        description,
        eventOn,
        lastDate,
    } )
    res.status( 201 ).json( event )
} )

// @route PUT /api/events/:id
const updateEvent = asyncHandler( async ( req, res ) => {
    const event = await Event.findById( req.params.id )
    if ( !event ) {
        res.status( 404 )
        throw new Error( "Event not found!" )
    }

    const updatedEvent = await Event.findByIdAndUpdate( req.params.id, req.body, { new: true } )
    res.json( updatedEvent )
} )

// @route DELETE /api/events/:id
const deleteEvent = asyncHandler( async ( req, res ) => {
    const event = await Event.findById( req.params.id )
    if ( !event ) {
        res.status( 404 )
        throw new Error( "Event not found!" )
    }

    await event.remove()

    res.json( { id: `${req.params.id}` } )
} )

const getOneEvent = asyncHandler( async ( req, res ) => {
    try {
        const event = await Event.findById( req.params.id )
        res.status( 200 ).json( event )
    } catch ( err ) {
        res.status( 404 )
        throw new Error( "Event not found" )
    }

} )

const participate = asyncHandler( async ( req, res ) => {
    const { eventId, branch } = req.body
    const userId = req.user.id
    const student = await Student.findById( userId )
    if ( !student ) {
        res.status( 400 )
        throw new Error( "Only students can participate!" )
    }
    let participate = await EventParticipants.findOne( { userId } )
    if ( participate ) {
        res.status( 400 )
        throw new Error( "Already participating!" )
    }
    participate = await EventParticipants.create( { eventId, userId, branch } )
    const { title, _id, eventOn, lastDate, participants } = await Event.findById( eventId ).select( "-description" )
    const updatedEvent = { ...participants, total: participants.total + 1, [`${branch}`]: participants[`${branch}`] == null ? 1 : participants[`${branch}`] + 1 }
    const addPartcipation = await Event.findByIdAndUpdate( eventId, { participants: updatedEvent }, { new: true } )
    const updateStudent = await Student.findByIdAndUpdate( userId, { $push: { participatedEvents: { $each: [{ title, id: _id, eventOn, lastDate }] } } } )
    res.status( 200 ).json( participate )

} )

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
    getOneEvent,
    participate
}
