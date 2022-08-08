const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// imports
const user = require('./routes/userRoutes');
const images = require('./routes/imageRoutes');
const uploads = require('./routes/uploadRoutes');
const pageNotFound = require('./routes/pageNotFound');

// initializer
const app = express();
dotenv.config();
const port = process.env.PORT || 8100;
const corsUrl = process.env.ALLOWED_URLS || '';

// cors configuration
const whitelist = corsUrl.split(',').map(item => item.trim())
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization']
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
app.use('/auth', user);
app.use('/uploads', uploads);
app.use('/images', images);
app.all('*',pageNotFound);

