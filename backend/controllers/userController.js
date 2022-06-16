const asyncHandler = require( 'express-async-handler' )
const jwt = require( 'jsonwebtoken' )
const bcrypt = require( 'bcryptjs' )

const User = require( '../models/userModel' )
const studentModel = require( '../models/studentModel' )

// @route POST /api/users/
// @desc  Register new users
const registerUser = asyncHandler( async ( req, res ) => {
    const { modName, modEmail, modPassword, branch } = req.body
    if ( !modName || !modEmail || !modPassword || !branch ) {
        res.status( 400 )
        throw new Error( "Please provide all attributes for registration" )
    }

    const userExists = await User.findOne( { email: modEmail } )
    const branchModExists = await User.findOne( { branch } )
    if ( userExists ) {
        res.status( 400 )
        throw new Error( "User already Exists!" )
    }
    if ( branchModExists ) {
        res.status( 400 )
        throw new Error( "Moderator for given branch already exists!" )
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash( modPassword, salt )
    const user = await User.create( {
        name: modName, email: modEmail, password: hashedPassword, branch
    } )

    if ( user ) {
        res.status( 201 ).json( {
            _id: user.id,
            name: user.name,
            email: user.email,
            branch: user.branch,
            message: 'success'
        } )
    } else {
        res.status( 400 )
        throw new Error( "Invalid data!" )
    }

} )

// @route POST /api/users/login
// @desc  Login users
const loginUser = asyncHandler( async ( req, res ) => {
    const { email, password } = req.body
    if ( !email || !password ) {
        res.status( 400 )
        throw new Error( "Please provide all credentials" )
    }
    const user = await User.findOne( { email } )

    if ( !user ) {
        res.status( 400 )
        throw new Error( "Account does not exists!" )
    }
    if ( user && ( await bcrypt.compare( password, user.password ) ) ) {
        res.status( 201 ).json( {
            _id: user.id,
            name: user.name,
            email: user.email,
            branch: user.branch,
            role: user.role,
            token: generateToken( user.id )
        } )
    } else {
        res.status( 400 )
        throw new Error( "Invalid credentials!" )
    }
} )

const getProfile = asyncHandler( async ( req, res ) => {
    let user = await User.findById( req.user.id )
    if ( user ) {
        res.status( 200 ).json( { id: user._id, name: user.name, email: user.email, role: user.role, branch: user.branch } )
    } else {
        user = await studentModel.findById( req.user.id )
        res.status( 200 ).json( { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified, isApproved: user.isApproved, role: user.role, branch: user.branch, participatedEvents: user.participatedEvents } )
    }
} )

const generateToken = ( id ) => {
    return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: '1d' } )
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}