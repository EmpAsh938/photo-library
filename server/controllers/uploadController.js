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
    let fields = {path:'uploads'+req.path};
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
        let root_path = req.path.split('/')[1];
        const options = {
            root: path.join(__dirname, `../uploads/${root_path}`),
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
                })
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
            }
            return res.status(200).json({
                success: true,
                message: 'successfully saved',
                body: null
            })
        }
    })
}

const removeOne = (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: 'empty id',
            body: null
        })
    }
    let pathName = '';
    fileModel.select('photos',{pid:id},(err, result) => {
        if(err) return res.status(400).json({
            success:false,
            message: err,
            body: null
        })
        if(result.length === 0) return res.status(400).json({
            success: false,
            message: 'file not found',
            body: null
        })
        pathName = result[0].path;
        fs.rm(pathName, (error) => {
            if(error) {
                return res.status(400).json({
                    success: false,
                    message: error,
                    body: null
                })
            }
        })
        let fields = {pid:id};
        fileModel.delete('photos',fields, (err, results) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    message: err,
                    body: null
                })
            }
            if(!results) {
                return res.status(400).json({
                    success: false,
                    message: 'deletion failed',
                    body: null
                })
            }
        })
        
        return res.status(200).json({
            success: true,
            message: 'deleted successfully',
            body: []
        })
    })
    
}

const removeAll = (req, res) => {
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
                success: false,
                message: 'no files to remove',
                body: null
            })
        }

        const length = files.length;
        for(let i=0;i<length;i++){
            let pathF = pathName.split('/server/')[1]+'/'+files[i];
            fs.rm(pathF, (err) => {
                if(err) {
                    return res.status(400).json({
                        success: false,
                        message: err,
                        body: null
                    })
                }
            })
            let fields = {path:path};
            fileModel.delete('photos',fields,(err, results) => {
                if(err) {
                    return res.status(400).json({
                        success: false,
                        message: err,
                        body: null
                    })
                }
                if(!results) {
                    return res.status(400).json({
                        success: false,
                        message: 'deletion failed',
                        body: null
                    })
                }

            })
        }
        return res.status(200).json({
            success: true,
            message: 'succesfully removed',
            body: []
        })
    })
}

module.exports = {
    saveFile,
    getUpload,
    removeOne,
    removeAll,
    uploadFile,
    saveFileDetails,
}