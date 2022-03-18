const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const DB = process.env.URI;
        console.log(DB)

        await mongoose.connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            console.log(`MongoDb database connection successful`);
        }).catch((err) => {
            console.log("connection error" + err)
        });




    } catch (error) {
        console.log(`Error: ${ error.message }`)
        process.exit(1)
    }
};

module.exports = connectDb;