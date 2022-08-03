const path = require('path');

const uploadImage = (req, res) => {
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

const saveImage = (req, res) => {

}

const deleteAll = (req, res) => {

}

const deleteSingleImage = (req, res) => {

}

module.exports = {
    saveImage,
    deleteAll,
    uploadImage,
    deleteSingleImage
};