const express = require('express');
const dotenv = require('dotenv');
const ConnectingDB = require('./config/db');
const router = require('./routes/userRoutes');

const app = express();

ConnectingDB();

dotenv.config();
app.use(express.json());

app.use('/user', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});