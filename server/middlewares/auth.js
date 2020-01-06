const jwt = require('jsonwebtoken');
const webAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next()

}

const apiAuth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return next(error);
    }
    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: true
        }, (err, decodedToken) => {
            // console.log(err);
            // if (err.name === "TokenExpiredError" || !err) {
            //     //console.log("Token expired ..................");
            // }
            req.userId = decodedToken.userId;
            next();
            // if (!decodedToken) {
            //     const error = new Error('Not authenticated.');
            //     error.statusCode = 401;
            //     return next(error);
            // }  
        });

    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }

};

module.exports = { webAuth, apiAuth };
