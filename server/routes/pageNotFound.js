const pageNotFound = (req,res) => {
    res.json({
        message: "page not found"
    })
}

module.exports = pageNotFound