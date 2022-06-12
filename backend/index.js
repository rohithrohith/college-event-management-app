const express = require( 'express' )
const colors = require( 'colors' )
const cors = require( 'cors' )
const dotenv = require( 'dotenv' ).config()
const { errorHandler } = require( './middleware/errorMiddleware' )
const connectDB = require( './config/db' )


connectDB()

const port = process.env.PORT || 5500

const app = express()

app.use( express.json() )
app.use( cors( {
    origin: "*"
} ) )
app.use( express.urlencoded( { extended: false } ) )

app.use( '/api/events/', require( './routes/eventRoutes' ) )
app.use( '/api/users/', require( './routes/userRoutes' ) )
app.use( '/api/students/', require( './routes/studentRoutes' ) )

app.use( errorHandler )

app.listen( port, () => { console.log( "Server Started".cyan ) } )