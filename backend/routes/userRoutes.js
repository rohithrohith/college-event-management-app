const express = require( 'express' )
const router = express.Router()
const { registerUser, loginUser, getProfile, approveStudent } = require( '../controllers/userController' )
const { protect } = require( '../middleware/authMiddleware' )

router.post( '/', registerUser )
router.post( '/login', loginUser )
router.get( '/profile', protect, getProfile )
router.put( '/approve/:email', approveStudent )

module.exports = router