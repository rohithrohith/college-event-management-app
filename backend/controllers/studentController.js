const asyncHandler = require( 'express-async-handler' )
const jwt = require( 'jsonwebtoken' )
const bcrypt = require( 'bcryptjs' )

const Student = require( '../models/studentModel' )

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

module.exports = {
    registerStudent,
    loginStudent,
    getProfile
}