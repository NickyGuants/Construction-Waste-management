const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDb = require('./config/db')

const cors = require("cors");
const app = express();

dotenv.config({ path: './config/.env' })

// import usersRoutes
const userRoute = require('./components/users/routes/userRoutes');
// import siteRoutes
const siteRoute = require('./components/sites/routes/siteRoutes')

//const wasteRoute = require('./components/wastes/routes/wasteRoute')

const pickupRoute = require('./components/pickups/routes/pickupRoutes')


const { notFound, errorHandler } = require('./components/users/middlewares/errorMiddleware');


app.use(express.json())
app.use(cors());


app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs) );
app.use('/users', userRoute)
app.use('/sites', siteRoute)
app.use('/pickup', pickupRoute)


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDb();

app.listen(port, () => {
    console.log(`Waste management api running on port ${ port }`);
})