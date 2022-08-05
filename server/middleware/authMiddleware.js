const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log(decoded);
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized',
                body: null
            })
        }
        
    } else {

        return res.status(401).json({
            success: false,
            message: 'Not authorized',
            body: null
        })
    }
}

module.exports = validateUser;