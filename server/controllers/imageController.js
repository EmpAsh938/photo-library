const path = require('path');
const FileModel = require('../model/fileModel');


const fileModel = new FileModel();

const getAllFile = (req, res) => {
    const { page } = req.query;
    if(!page || isNaN(page)) {
        res.status(400).json({
            success:false,
            message: 'pass valid query: page',
            body: null
        })
        return;
    }
    res.json({
        message:"get all files"
    })
}

const getMatching = (req, res) => {
        
}


module.exports = {
    getAllFile,
    getMatching,
}