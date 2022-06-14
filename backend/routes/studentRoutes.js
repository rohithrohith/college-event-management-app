const express = require( 'express' )
const router = express.Router()
const { registerStudent, loginStudent, approveStudent, getProfile, getStudents, verifyStudent, getBranchStudents, sendOtp, rejectStudent } = require( '../controllers/studentController' )
const { protect } = require( '../middleware/authMiddleware' )

router.post( '/', registerStudent )
router.get( '/', protect, getStudents )
router.get( '/branch/:branch', protect, getBranchStudents )
router.post( '/login', loginStudent )
router.get( '/profile', protect, getProfile )
router.post( '/otp', sendOtp )
router.put( '/verify/:email', verifyStudent )
router.put( '/approve/:id', protect, approveStudent )
router.delete( '/reject/:id', protect, rejectStudent )

module.exports = router