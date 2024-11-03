const express = require('express');
const { protect } = require('../middlewares/protect');
const { createTask } = require('../controllers/taskControllers');
const { deleteTask } = require('../controllers/taskControllers');

const router = express.Router();

const taskRouter = (wss) => {
    router.post('/createtask', protect, createTask(wss));
    router.delete('/delete/:listTaskId', protect, deleteTask)
    return router;
}

module.exports = taskRouter;