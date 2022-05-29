const mongoose = require( 'mongoose' )

const connectDB = async () => {
    try {
        const con = await mongoose.connect( process.env.MONGODB_URI )
        console.log( "[MongoDB] Database connected".green )
    } catch ( error ) {
        console.log( error )
        process.exit( 1 )
    }
}

module.exports = connectDB 