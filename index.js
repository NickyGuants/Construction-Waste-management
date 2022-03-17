const express = require( 'express' );
const dotenv = require( 'dotenv' );
const mongoose = require( 'mongoose' );
const connectDb = require('./config/db')

dotenv.config({ path: './config/.env'})

const app = express();

connectDb();


const port = process.env.PORT || 3000;


app.listen( port, () =>
{
    console.log( `Waste management api running on port ${ port }` );
})