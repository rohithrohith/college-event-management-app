const express = require( 'express' )
const router = express.Router()
const { getEvents, deleteEvent, insertEvent, updateEvent } = require( '../controllers/controller' )

router.route( '/' ).get( getEvents ).post( insertEvent )
router.route( '/:id' ).delete( deleteEvent ).put( updateEvent )

module.exports = router