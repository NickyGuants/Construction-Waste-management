const express = require('express');
const dotenv = require('dotenv');
const connectDb = require( './config/db' )
const swaggerUi = require( 'swagger-ui-express' );
const apiDocs = require( './E-Jenzi-api.swagger.json' );

const cors = require("cors");
const app = express();

dotenv.config({ path: './config/.env' })

// import usersRoutes
const userRoute = require('./components/users/routes/userRoutes');
// import siteRoutes
const siteRoute = require('./components/sites/routes/siteRoutes')

const { notFound, errorHandler } = require('./components/users/middlewares/errorMiddleware');


app.use(express.json())
app.use(cors());

app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs) );
app.use('/users', userRoute)
app.use('/sites', siteRoute)


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDb();

app.listen(port, () => {
    console.log(`Waste management api running on port ${ port }`);
})