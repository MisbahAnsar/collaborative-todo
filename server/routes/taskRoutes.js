const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');
const createTask = require('../controllers/taskControllers');

router.post('/createtask', protect, createTask);

module.exports = router;


