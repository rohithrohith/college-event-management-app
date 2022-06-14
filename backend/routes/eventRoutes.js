const express = require( 'express' )
const router = express.Router()
const { getEvents, participate, insertEvent, updateEvent, getOneEvent } = require( '../controllers/eventController' )
const { protect, adminAction } = require( '../middleware/authMiddleware' )

router.route( '/' ).get( protect, getEvents ).post( protect, adminAction, insertEvent )
router.route( '/:id' ).put( protect, adminAction, updateEvent ).get( protect, getOneEvent )
router.route( '/participate' ).post( protect, participate )

module.exports = router