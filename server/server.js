const express = require('express');
const dotenv = require('dotenv');

// initialzier
const app = express();
dotenv.config();

// defaults and middleware
const port = process.env.PORT || 8100;

// routes
app.get('/', (req,res) => {
    res.json({
        message:"Home",
    })
})

// listener
app.listen(port, () => {
    console.log("Server running on "+port);
})