const express = require('express');
const { protect } = require('../middlewares/protect');
const createTask = require('../controllers/taskControllers');

const router = express.Router();

const taskRouter = (wss) => {
    router.post('/createtask', protect, createTask(wss));
    return router;
}

module.exports = taskRouter;