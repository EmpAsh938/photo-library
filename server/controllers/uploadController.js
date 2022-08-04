const FileModel = require('../model/fileModel');

const uploadFile = (req, res) => {
    const file = req.files;
    if(file['photosArray']===undefined) {
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

const getUpload = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({
            success:false,
            message:'missing file id',
            body: null
        })
    }
    const options = {
        root: path.join(__dirname, '../uploads'),
        dotfiles: 'deny',
        headers: {
            'Content-Type':'image/png',
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
    })
}

const saveFileDetails = (req, res) => {
    const { id } = req.params;
    const { description, tags } = req.body;
    if(!id || !description || !tags) {
        return res.status(400).json({
            success: false,
            message: 'id/description/tags missing',
            body: null
        })
    }

}

const saveFile = (req, res) => {


}

module.exports = {
    saveFile,
    uploadFile,
    getUpload,
    saveFileDetails,
}