const fs = require('fs');
const path = require('path');
const connection = require('../db');
const FileModel = require('../model/fileModel');

const fileModel = new FileModel();

const uploadFile = (req, res) => {
    const file = req.files;
    if(!file || file['photosArray']===undefined) {
        res.status(400).json({
            success:false,
            message:'Wrong extension/mime type or no valid file',
            body: null
        })
    } else {
        let extension = file.photosArray[0].mimetype;
        let id = Math.floor(Math.random() * 1E10);
        let values = {pid:id,path:file.photosArray[0].path,creator_name:'author',tags:'',description:'',file_ext:extension,creator_id:'344nrt3pg5s5yqqy8mrs'};
        fileModel.save('photos',values,(err, results) => {
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

const getUpload = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({
            success:false,
            message:'missing file id',
            body: null
        })
    }
    
    let fields = {path:'uploads/tmp/'+id};
    fileModel.select('photos',fields,(err, results) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: err,
                body: null
            })
        }
        if(results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'image not found',
                body: null
            })
        }
        const options = {
            root: path.join(__dirname, '../uploads/tmp'),
            dotfiles: 'deny',
            headers: {
                'Content-Type':results[0].file_ext,
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }
        res.sendFile(id, options, (err) => {
            
            if(err) {
                console.log(err);
            } else {
                console.log('Sent: '+id);
            }
            res.end();
        })
    })
}

const saveFileDetails = (req, res) => {
    const { id } = req.params;
    const { description, tags } = req.body;
    if(!id || (!description && !tags)) {
        return res.status(400).json({
            success: false,
            message: 'id and (description or tags) missing',
            body: null
        })
    }
    let descriptionField = connection.escape(description);
    let tagsField = connection.escape(tags);
    let fields = { description: descriptionField, tags: tagsField };
    let condition = {pid:id};
    fileModel.select('photos', condition, (err, results) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: err,
                body: null
            })
        }

        if(results.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'id does not match',
                body: null
            })
        }

        fileModel.update('photos', fields, condition, (err, doc) => {
                if(err) {
                    return res.status(400).json({
                        success: false,
                        message: err,
                        body: null
                    })
                }
                if(!doc) {
                    return res.status(400).json({
                        success: false,
                        message: 'update failed',
                        body: null
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'succesfully updated',
                    body: results
                })
            })
    })
}


const saveFile = (req, res) => {
    const pathName = path.join(__dirname, '../uploads/tmp');
    fs.readdir(pathName, (err, files) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: err,
                body: null
            })
        }
        if(files.length === 0) {
            return res.status(400).json({
                success: true,
                message: 'none uploaded',
                body: null
            })
        } else {
            let srcPath = pathName;
            let destPath = path.join(__dirname, '../uploads/images');
            const length = files.length;
            for(let index=0;index<length;index++){
                let oldPath = `${srcPath}/${files[index]}`;
                let newPath = `${destPath}/${files[index]}`;
                fs.rename(oldPath, newPath, (err) => {
                    if(err) {
                        return res.json(400).json({
                            success: false,
                            message: err,
                            body: null
                        })
                    }
                    let field = {path:newPath.split('/server/')[1]};
                    let condition = {path:oldPath.split('/server/')[1]};
                    fileModel.update('photos',field,condition, (err, result) => {
                        if(err) {
                            return res.status(400).json({
                                success: false,
                                message: err,
                                body: null
                            })
                        }
                        if(!result) {
                            return res.status(400).json({
                                success: false,
                                message: 'path update failed',
                                body: null
                            })
                        }
                    })
                })
            }
            return res.json({
                success: true,
                message: 'successfully saved',
                body: null
            })
        }
    })
}

module.exports = {
    saveFile,
    uploadFile,
    getUpload,
    saveFileDetails,
}