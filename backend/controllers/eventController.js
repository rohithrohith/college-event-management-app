const asyncHandler = require( 'express-async-handler' )

const Event = require( '../models/eventModel' )

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
        lastDate
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

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent,
    getOneEvent
}