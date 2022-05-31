const asyncHandler = require( 'express-async-handler' )
const jwt = require( 'jsonwebtoken' )
const bcrypt = require( 'bcryptjs' )

const User = require( '../models/userModel' )

// @route POST /api/users/
// @desc  Register new users
const registerUser = asyncHandler( async ( req, res ) => {
    const { name, email, password, branch, role } = req.body
    if ( !name || !email || !password || !role ) {
        res.status( 400 )
        throw new Error( "Please provide all attributes for registration" )
    }

    const userExists = await User.findOne( { email } )
    if ( userExists ) {
        res.status( 400 )
        throw new Error( "User already Exists!" )
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash( password, salt )
    const user = await User.create( {
        name, email, password: hashedPassword, branch, role
    } )

    if ( user ) {
        res.status( 201 ).json( {
            _id: user.id,
            name: user.name,
            email: user.email,
            branch: user.branch,
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
            token: generateToken( user.id )
        } )
    } else {
        res.status( 400 )
        throw new Error( "Invalid credentials!" )
    }
} )

const getProfile = asyncHandler( async ( req, res ) => {
    const { _id, name, email } = await User.findById( req.user.id )
    res.status( 200 ).json( { id: _id, name, email } )
} )

const generateToken = ( id ) => {
    return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: '1d' } )
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}