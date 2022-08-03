const express = require('express');
const multer = require('multer');
const pageNotFound = require('./pageNotFound');
const { getAllFile, getSingleFile, uploadFile } = require('../controllers/fileUploadController');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 1E9);
        cb(null, file.originalname.split('.')[0]+'-'+uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const { mimetype, originalname } = file;
    if(mimetype.split('/')[0] === 'image' && ['jpeg','jpg','png'].includes(originalname.split('.')[1])) {
        cb(null,true);
    } else {
        cb(null,false);
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });
const cpUpload = upload.fields([{name:'photosArray'}]);


router.get('/get/all?', getAllFile);
router.get('/get/:id', getSingleFile);
router.post('/upload', cpUpload, uploadFile);
router.all('*', pageNotFound);

module.exports = router;