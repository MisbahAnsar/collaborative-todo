const express = require('express');
const { protect } = require('../middlewares/protect');
const { createTask } = require('../controllers/taskControllers');
const { deleteTask } = require('../controllers/taskControllers');

const router = express.Router();

const taskRouter = (wss) => {
    router.post('/:listId/task', protect, createTask(wss));
    router.delete('/:listId/task/:taskId', protect, deleteTask(wss))
    return router;
}

module.exports = taskRouter;