import express from 'express';

const app = express();
const port = process.env.PORT || 8100;

app.get('/', (req,res) => {
    res.json({
        message:"Home",
    })
})

app.listen(port, () => {
    console.log("Server running on "+port);
})