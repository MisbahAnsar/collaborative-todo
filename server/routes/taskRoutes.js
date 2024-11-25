const express = require('express');
const { protect } = require('../middlewares/protect');
const { createTask, getTasks } = require('../controllers/taskControllers');
const { deleteTask } = require('../controllers/taskControllers');

const router = express.Router();

const taskRouter = (wss) => {
    router.post('/:listId/task', protect, createTask(wss));
    router.delete('/:listId/task/:taskId', protect, deleteTask(wss))
    router.get('/:listId/mytasks', protect, getTasks(wss));
    return router;
}

module.exports = taskRouter;