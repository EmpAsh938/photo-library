const FileModel = require('../model/fileModel');
const calcPageIndex = require('../utils/calcPageIndex');

const fileModel = new FileModel();

const getAllFile = (req, res) => {
    const { page, per_page } = req.query;
    if(!page || isNaN(page) || !per_page || isNaN(per_page)) {
        return res.status(400).json({
            success:false,
            message: 'pass valid query: page/per_page',
            body: null
        })
    }
    if(page < 1 || per_page < 5) {
        return res.status(400).json({
            success: false,
            message: 'page can\'t be negative/zero OR per_page can\'t be less than 5',
            body: null
        })
    }
    let num_page = parseInt(page);
    let num_per_page = parseInt(per_page);
    let fields = [calcPageIndex(num_page,num_per_page)-1,num_per_page];
    fileModel.readAll('photos',fields,(err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: err,
                body: null
            })
        }



        if(result.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'no items to retrieve',
                body: []
            })
        }
        return res.status(200).json({
            success: true,
            message: 'successfully retrieved',
            body: result
        })
    })
}

const getMatching = (req, res) => {
        
}


module.exports = {
    getAllFile,
    getMatching,
}


/*

1 - 5
2 - 5

3 - 15

2 - 10

*/