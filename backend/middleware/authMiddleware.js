const jwt = require( 'jsonwebtoken' )
const asyncHandler = require( 'express-async-handler' )
const User = require( '../models/userModel' )
const Student = require( '../models/studentModel' )

const protect = asyncHandler( async ( req, res, next ) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith( "Bearer" ) ) {
        try {
            token = req.headers.authorization.split( " " )[1]

            const decodedToken = jwt.verify( token, process.env.JWT_SECRET )

            let user = await User.findById( decodedToken.id ).select( "-password" )
            if ( !user ) {
                user = await Student.findById( decodedToken.id ).select( "-password" )
            }
            req.user = user

            next()
        } catch ( err ) {
            res.status( 401 )
            throw new Error( "Not authorized!" )
        }
        if ( !token ) {
            res.status( 401 )
            throw new Error( "Not authorized! Please sign In" )
        }
    }
} )


const adminAction = ( req, res, next ) => {
    if ( req.user.role && req.user.role === "ADMIN" )
        next()
    else {
        res.status( 401 )
        console.log( "[ERROR] This action needs ADMIN access".red )
        throw new Error( "Need ADMIN access!" )
    }

}


const studentAction = ( req, res, next ) => {
    if ( req.user.role && req.user.role === "STUDENT" )
        next()
    else {
        res.status( 401 )
        throw new Error( "This action can only performed by student" )
    }

}

module.exports = { protect, adminAction, studentAction }