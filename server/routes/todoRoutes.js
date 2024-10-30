const express = require('express');
const CreateTodo = require('../controllers/todoController');
const router = express.Router();
const { protect } = require('../middlewares/protect')

router.post('/create', protect, CreateTodo);

module.exports = router;