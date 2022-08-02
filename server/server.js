const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = reqiure('cors');

// imports
const user = require('./routes/userRoutes');
const fileUpload = require('./routes/fileUploadRoutes');
const pageNotFound = require('./routes/pageNotFound');

// initializer
const app = express();
dotenv.config();
const port = process.env.PORT || 8100;
const corsUrl = process.env.ALLOWED_URLS || '';
const whitelist = corsUrl.split(',').map(item => item.trim())
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}


// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}))


// listener
app.listen(port, () => {
    console.log("Server running on "+port);
})

// routes
app.use('/auth',user);
app.use('/images',fileUpload);
app.all('*',pageNotFound);

