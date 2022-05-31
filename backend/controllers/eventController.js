const asyncHandler = require( 'express-async-handler' )

const Event = require( '../models/eventModel' )

// @route GET /api/events
const getEvents = asyncHandler( async ( req, res ) => {
    const events = await Event.find()

    console.log( req.user )
    res.status( 200 ).json( events )

} )

// @route PUT /api/events
const insertEvent = asyncHandler( async ( req, res ) => {
    if ( !req.body.title || !req.body.description ) {
        res.status( 400 )
        throw new Error( 'Please enter all attributes!' )
    }
    const event = await Event.create( {
        title: req.body.title,
        description: req.body.description
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

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    deleteEvent
}