const express = require('express');
const { CreateTodo, removeTodo } = require('../controllers/todoController');
const router = express.Router();
const { protect } = require('../middlewares/protect')

router.post('/create', protect, CreateTodo);
router.delete('/remove/:todolistid', protect, removeTodo)

module.exports = router;