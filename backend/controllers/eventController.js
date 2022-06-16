const asyncHandler = require( 'express-async-handler' )

const Event = require( '../models/eventModel' )
const EventParticipants = require( '../models/eventParticipantModel' )
const Student = require( '../models/studentModel' )
const fs = require( 'fs' )




// @route GET /api/events
const getEvents = asyncHandler( async ( req, res ) => {
    let sortOptions = { createdAt: -1 }
    if ( req.query.sort == "createdAt" ) {
        sortOptions = { createdAt: parseInt( req.query.order ) }
    }
    if ( req.query.sort == "title" ) {
        sortOptions = { title: parseInt( req.query.order ) }
    }
    const count = await Event.count()
    const events = await Event.find().sort( sortOptions ).skip( req.query.page ? ( parseInt( req.query.page ) - 1 ) * parseInt( req.query.limit ) : 0 ).limit( req.query.limit ? parseInt( req.query.limit ) : null )
    res.status( 200 ).json( { events, user: req.user, eventsCount: count } )

} )

// @route PUT /api/events
const insertEvent = asyncHandler( async ( req, res ) => {
    const { title, description, eventOn, lastDate } = req.body
    const filename = req.file.filename
    if ( !title || !description || !eventOn || !lastDate ) {
        res.status( 400 )
        throw new Error( 'Please enter all attributes!' )
    }
    const event = await Event.create( {
        title,
        description,
        eventOn,
        lastDate,
        thumbnail: {
            data: fs.readFileSync( './backend/uploads/eventThumbs/' + filename ),
            name: filename,
            contentType: req.file.mimetype
        }
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
    const { eventId, branch, eventDate } = req.body
    const userId = req.user.id
    let participate = await EventParticipants.findOne( { userId, eventId } )
    if ( participate ) {
        res.status( 400 )
        throw new Error( "Already participating in this event!" )
    }
    const { title, _id, eventOn, lastDate, participants } = await Event.findById( eventId ).select( "-description" )
    const ifEventsOverlap = await EventParticipants.find( { userId, eventOn: eventDate } )
    if ( ifEventsOverlap ) {
        res.status( 400 )
        throw new Error( "Cant participate in two events happening on the same day" )
    }
    participate = await EventParticipants.create( { eventId, userId, eventOn: eventDate } )
    const updatedEvent = { ...participants, total: parseInt( participants.total ) + 1, [`${branch}`]: participants[`${branch}`] == null ? 1 : parseInt( participants[`${branch}`] ) + 1 }
    const addPartcipation = await Event.findByIdAndUpdate( eventId, { participants: updatedEvent }, { new: true } )
    const updateStudent = await Student.findByIdAndUpdate( userId, { $push: { participatedEvents: { $each: [{ title, id: _id, eventOn, lastDate }] } } } )
    res.status( 200 ).json( updatedEvent )

} )


module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
    getOneEvent,
    participate
}
