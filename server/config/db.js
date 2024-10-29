const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ConnectingDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database succesfully");
    } catch(error){
        console.log("error connectiong to database");
        process.exit(1);
    }
};

module.exports = ConnectingDB;