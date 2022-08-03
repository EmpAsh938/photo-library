const express = require('express');
const { 
    uploadImage, 
    deleteSingleImage, 
    deleteAll
 } = require('../controllers/userFileController');
const router = express.Router();

router.get('/:id', uploadImage);
router.delete('/delete/:id', deleteSingleImage);
router.delete('/delete/all', deleteAll);


module.exports = router;