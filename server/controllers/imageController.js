const FileModel = require('../model/fileModel');

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

const getSingleFile = (req, res) => {

}

const uploadFile = (req, res) => {
    const file = req.files;
    if(file['photosArray']===undefined) {
        console.log('null');
        res.status(400).json({
            success:false,
            message:'Wrong extension/mime type or no valid file',
            body: null
        })
    } else {
        let id = Math.floor(Math.random() * 1E10);
        let values = {pid:id,path:file.photosArray[0].path,creator_name:'author',tags:'',title:'',creator_id:'344nrt3pg5s5yqqy8mrs'};
        new FileModel().save('photos',values,(err, results) => {
            if(err || results.length === 0) {
                return res.status(400).json({
                    success:false,
                    message: err,
                    body: null
                })
            }
            
            return res.status(201).json({
                success:true,
                message:"successfully uploaded",
                body: values
            })
        })
    }
}

module.exports = {
    getAllFile,
    getSingleFile,
    uploadFile
}