const express = require('express');
const dotenv = require('dotenv');
const ConnectingDB = require('./config/db');
const router = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');

dotenv.config();

const app = express();
ConnectingDB();


app.use(express.json());

app.use('/user', router);
app.use('/post', todoRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});