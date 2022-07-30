const express = require('express');
const router = express.Router();
const { signInUser, registerUser } = require('../controllers/userController');
const pageNotFound = require('./pageNotFound');



router.route('/login').post(signInUser);
router.route('/register').post(registerUser);
router.route('*').all(pageNotFound);



module.exports = router;