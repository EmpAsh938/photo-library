const express = require('express');
const multer = require('multer');
const validateUser = require('../middleware/authMiddleware');
const { 
    saveFile, 
    removeOne, 
    getUpload, 
    removeAll, 
    uploadFile, 
    saveFileDetails
} = require('../controllers/uploadController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tmp/')
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

router.post('/', validateUser, cpUpload, uploadFile);
router.post('/:id', validateUser, saveFileDetails);
router.get('/save', validateUser, saveFile);
router.get('/tmp/:id', getUpload);
router.get('/images/:id', getUpload);
router.delete('/', validateUser, removeAll);
router.delete('/:id', validateUser, removeOne);

module.exports = router;