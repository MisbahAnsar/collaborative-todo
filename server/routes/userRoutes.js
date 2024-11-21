const express = require('express');
const { signupUser, loginUser, getUserDetails } = require('../controllers/userController');
const { protect } = require('../middlewares/protect')
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/userDetail', protect, getUserDetails);

module.exports = router;