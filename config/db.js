const mongoose = require( 'mongoose' );

const connectDb = async () =>
{
    try {
        const DB = process.env.URI;

        const conn = await mongoose.connect( DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        } );

        console.log( `MongoDb database connection successful` );
        
    } catch (error) {
        console.log( `Error: ${ error.message }` )
        process.exit(1)
    }
};

module.exports = connectDb;