const express = require( 'express' )
const router = express.Router()
const { registerStudent, loginStudent, getProfile } = require( '../controllers/studentController' )
const { protect } = require( '../middleware/authMiddleware' )

router.post( '/', registerStudent )
router.post( '/login', loginStudent )
router.get( '/profile', protect, getProfile )

module.exports = router