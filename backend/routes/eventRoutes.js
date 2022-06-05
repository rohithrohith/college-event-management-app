const express = require( 'express' )
const router = express.Router()
const { getEvents, deleteEvent, insertEvent, updateEvent } = require( '../controllers/eventController' )
const { protect, adminAction } = require( '../middleware/authMiddleware' )

router.route( '/' ).get( protect, getEvents ).post( protect, adminAction, insertEvent )
router.route( '/:id' ).delete( protect, adminAction, deleteEvent ).put( protect, adminAction, updateEvent )

module.exports = router