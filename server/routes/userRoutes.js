const express = require('express');
const router = express.Router();
const { signInUser, registerUser } = require('../controllers/userController');


router.route('/login').post(signInUser);
router.route('/register').post(registerUser);



module.exports = router;