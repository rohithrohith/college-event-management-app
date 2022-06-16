const express = require( 'express' )
const multer = require( 'multer' )
const path = require( 'path' )


const Storage = multer.diskStorage( {
    destination: ( req, file, callback ) => {
        callback( null, './backend/uploads/eventThumbs' )
    },

    filename: ( req, file, callback ) => {
        callback( null, Date.now() + path.extname( file.originalname ) )
    }
} )

const upload = multer( {
    storage: Storage,
    limits: 1024 * 1024 * 4,
    fileFilter: ( req, file, callback ) => {

        var filetypes = /jpeg|jpg|png/
        var mimetype = filetypes.test( file.mimetype )

        var extname = filetypes.test( path.extname(
            file.originalname ).toLowerCase() )

        if ( mimetype && extname ) {
            return callback( null, true )
        }

        callback( "Error: File upload only supports the "
            + "following filetypes - " + filetypes )
    }
} )
const router = express.Router()
const { getEvents, participate, insertEvent, updateEvent, getOneEvent } = require( '../controllers/eventController' )
const { protect, adminAction, studentAction } = require( '../middleware/authMiddleware' )

router.route( '/' ).get( protect, getEvents ).post( protect, adminAction, upload.single( 'eventThumb' ), insertEvent )
router.route( '/:id' ).put( protect, adminAction, updateEvent ).get( protect, getOneEvent )
router.route( '/participate' ).post( protect, studentAction, participate )

module.exports = router

