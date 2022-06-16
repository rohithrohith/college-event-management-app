const express = require( 'express' )
const router = express.Router()
const { registerUser, loginUser, getProfile } = require( '../controllers/userController' )
const { protect, adminAction } = require( '../middleware/authMiddleware' )

router.post( '/', protect, adminAction, registerUser )
router.post( '/login', loginUser )
router.get( '/profile', protect, getProfile )

module.exports = router