const express = require('express');
const { CreateTodo, removeTodo, updateTodo } = require('../controllers/todoController');
const router = express.Router();
const { protect } = require('../middlewares/protect')

router.post('/list/create', protect, CreateTodo);
router.delete('/list/remove/:todolistid', protect, removeTodo)
router.put('/list/update/:todoId', protect, updateTodo)

module.exports = router;