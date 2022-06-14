const asyncHandler = require( 'express-async-handler' )
const jwt = require( 'jsonwebtoken' )
const bcrypt = require( 'bcryptjs' )

const SentOtp = require( "../models/otpModel" )
const Student = require( '../models/studentModel' )

function generateOTP() {
    const digits = '0123456789'
    let otp = ''
    for ( let index = 0; index < 4; index++ ) {
        otp += digits[Math.floor( Math.random() * 10 )]
    }
    otp = parseInt( otp )
    if ( otp < 1000 ) {
        otp += 1000
    }
    return otp
}

function sendOtpMail( email, otp ) {
    console.log( email, otp )
}

const registerStudent = asyncHandler( async ( req, res ) => {
    const { name, email, password, branch } = req.body
    if ( !name || !email || !password || !branch ) {
        res.status( 400 )
        throw new Error( "Please provide all credentials!" )
    }

    const studentExists = await Student.findOne( { email } )
    if ( studentExists ) {
        res.status( 400 )
        throw new Error( "Student account already exists!" )
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash( password, salt )

    const student = await Student.create( {
        name, email, password: hashedPassword, branch
    } )

    if ( student ) {
        res.status( 201 ).json( {
            id: student.id, name: student.name, email: student.email, branch: student.branch
        } )
    } else {
        res.status( 400 )
        throw new Error( "Invalid data!" )
    }
} )

const getStudents = asyncHandler( async ( req, res ) => {
    const students = await Student.find().select( "-password" )
    res.status( 200 ).json( students )
} )

// @route POST /api/students/login/
// @desc  Verify student account email
const loginStudent = asyncHandler( async ( req, res ) => {
    const { email, password } = req.body
    if ( !email || !password ) {
        res.status( 400 )
        throw new Error( "Please provide all credentials" )
    }

    const student = await Student.findOne( { email } )

    if ( !student ) {
        res.status( 400 )
        throw new Error( "Account does not exists!" )
    }
    if ( student && ( await bcrypt.compare( password, student.password ) ) ) {
        res.status( 201 ).json( {
            _id: student.id,
            name: student.name,
            email: student.email,
            branch: student.branch,
            isVerified: student.isVerified,
            token: jwt.sign( { id: student.id }, process.env.JWT_SECRET, { expiresIn: '1d' } )
        } )
    } else {
        res.status( 400 )
        throw new Error( "Invalid credential" )
    }
} )


const getProfile = asyncHandler( async ( req, res ) => {
    const { _id, name, email } = await Student.findById( req.user.id )
    res.status( 200 ).json( { id: _id, name, email } )
} )

// @route PUT /api/students/verify/:email
// @desc  Verify student account email
const verifyStudent = asyncHandler( async ( req, res ) => {
    const { otp } = req.body
    const { email } = req.params
    console.log( otp )

    const otpDetails = await SentOtp.findOne( { email } )
    if ( !otpDetails ) {
        res.status( 400 )
        throw new Error( "No OTP" )
    }
    if ( otp == otpDetails.otp ) {
        const student = await Student.findOne( { email } )
        const updateStudent = await Student.findByIdAndUpdate( student._id, { isVerified: true }, { new: true } )
        await SentOtp.findOneAndRemove( { email } )
        if ( updateStudent ) {
            res.send( updateStudent )
        } else {
            res.status( 400 )
            throw new Error( "Something went wrong try again later" )
        }
    } else {
        res.status( 400 )
        throw new Error( "Invalid OTP!" )
    }
} )

const sendOtp = asyncHandler( async ( req, res ) => {
    const { email } = req.body
    if ( !email ) {
        res.status( 400 )
        throw new Error( "OTP or Email is missing!" )
    }
    const isAccountExists = await Student.findOne( { email } )
    if ( !isAccountExists ) {
        res.status( 400 )
        throw new Error( "Invalid E-mail, account with this E-mail does not exists" )
    }
    const isOtpAlreadySent = await SentOtp.findOne( { email } ).select( "-otp" )
    if ( isOtpAlreadySent ) {
        const otp = generateOTP()
        const sentOtp = await SentOtp.findByIdAndUpdate( isOtpAlreadySent._id, { otp: otp }, { new: false } )
        if ( sentOtp ) {
            res.status( 201 )
            sendOtpMail( email, otp )
            res.send( "OTP stored" )
        } else {
            res.status( 400 )
            throw new Error( "Something went wrong!" )
        }
    } else {
        const otp = generateOTP()
        const sentOtp = await SentOtp.create( { otp, email } )
        if ( sentOtp ) {
            res.status( 201 )
            sendOtpMail( email, otp )
            res.send( "OTP stored" )
        } else {
            res.status( 400 )
            throw new Error( "Something went wrong!" )
        }
    }

} )

// @route GET /api/students/branch/:branch
// @desc  Get all Students of the branch
const getBranchStudents = asyncHandler( async ( req, res ) => {
    const { branch } = req.params
    try {
        const approvedStudents = await Student.find( { branch: branch.toUpperCase(), isApproved: true } )
        const notYetApprovedStudents = await Student.find( { branch: branch.toUpperCase(), isApproved: false } )
        if ( approvedStudents && notYetApprovedStudents )
            res.json( { approvedStudents, notYetApprovedStudents } )
    } catch ( err ) {
        res.status( 400 )
        throw new Error( "Something went wrong! try again later" )
    }

} )

// @route PUT /api/students/approve/:id
// @desc  Approve students
const approveStudent = asyncHandler( async ( req, res ) => {
    const { id } = req.params
    try {
        const student = await Student.findById( id )
    } catch ( err ) {
        res.status( 400 )
        throw new Error( "Student account doesn't exists" )
    }
    const updatedStudent = await Student.findByIdAndUpdate( id, { isApproved: true }, { new: true } ).select( "-password" )
    if ( !updatedStudent ) {
        res.status( 400 )
        throw new Error( 'Something went wrong, try again later' )
    } else {
        const { email, name, isApproved, role, isVerified } = updatedStudent
        res.status( 200 ).json( { email, name, isApproved, role, isVerified } )
    }

} )

const rejectStudent = asyncHandler( async ( req, res ) => {
    const { id } = req.params
    let rejectedStudent = null
    try {
        rejectedStudent = await Student.findById( id )
        if ( !rejectedStudent ) {
            res.status( 400 )
            throw new Error( "Student account doesn't exists" )
        }
        if ( rejectedStudent.isApproved ) {
            res.status( 400 )
            throw new Error( "Student already has been approved, can not reject!" )
        }
        rejectedStudent = await Student.findByIdAndDelete( id )
    } catch ( err ) {
        res.status( 400 )
        throw new Error( err.message )
    }
} )

module.exports = {
    registerStudent,
    getStudents,
    loginStudent,
    getProfile,
    sendOtp,
    verifyStudent,
    approveStudent,
    getBranchStudents,
    rejectStudent,
}