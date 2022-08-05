const express = require('express');
const { getAllFile, getMatching } = require('../controllers/imageController');

const router = express.Router();

router.get('/list', getAllFile);
router.get('/search', getMatching);




module.exports = router;