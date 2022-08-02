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
        console.log('not null');
    }
}

module.exports = {
    getAllFile,
    getSingleFile,
    uploadFile
}