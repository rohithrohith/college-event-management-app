const express = require( 'express' )
const colors = require( 'colors' )
const dotenv = require( 'dotenv' ).config()
const { errorHandler } = require( './middleware/errorMiddleware' )
const connectDB = require( './config/db' )


connectDB()

const port = process.env.PORT || 5500

const app = express()

app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )
app.use( errorHandler )

app.use( '/api/events/', require( './routes/routes' ) )

app.listen( port, () => { console.log( "Server Started".cyan ) } )