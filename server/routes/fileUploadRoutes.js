const express = require('express');
const router = express.Router();
const pageNotFound = require('./pageNotFound');
const { getAllFile, getSingleFile, uploadFile } = require('../controllers/fileUploadController');

router.route('/get/all?').get(getAllFile);
router.route('/get/:id').get(getSingleFile);
router.route('/upload').post(uploadFile);
router.route('*').all(pageNotFound);

module.exports = router;