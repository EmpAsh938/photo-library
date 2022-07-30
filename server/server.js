const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// imports
const user = require('./routes/userRoutes');
const pageNotFound = require('./routes/pageNotFound');
const connection = require('./model/db');

// initialzier
const app = express();
dotenv.config();
const port = process.env.PORT || 8100;


// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// database connection
connection.connect(err => {
    if(err) {
        console.log('Error connecting to database: '+ err.stack);
        return;
    }

    // listener
    app.listen(port, () => {
        console.log("Server running on "+port);
    })
    
})

// routes
app.use('/auth',user);
app.all('*',pageNotFound);