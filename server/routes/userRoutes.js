const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/authMiddleware');
const { signInUser, registerUser, verifyUser } = require('../controllers/userController');


router.get('/verify', validateUser, verifyUser);
router.post('/login', signInUser);
router.post('/register', registerUser);



module.exports = router;