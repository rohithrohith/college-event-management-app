const express = require( 'express' )
const router = express.Router()
const { registerStudent, loginStudent, getProfile, getStudents, verifyStudent, sendOtp } = require( '../controllers/studentController' )
const { protect } = require( '../middleware/authMiddleware' )

router.post( '/', registerStudent )
router.get( '/', protect, getStudents )
router.post( '/login', loginStudent )
router.get( '/profile', protect, getProfile )
router.post( '/otp', sendOtp )
router.put( '/verify/:email', verifyStudent )

module.exports = router