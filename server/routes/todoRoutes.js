const express = require('express');
const { CreateTodo, addCollaborator, removeCollaborator } = require('../controllers/todoController');
const router = express.Router();
const { protect } = require('../middlewares/protect')

router.post('/create', protect, CreateTodo);
router.post('/:listId/collaborator', protect, addCollaborator)
router.delete('/:listId/collaborator/:userId', protect, removeCollaborator)

module.exports = router;