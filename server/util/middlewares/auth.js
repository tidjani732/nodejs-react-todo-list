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
    customPromise(token, process.env.JWT_SECRET)
        .then(userId => {
            req.userId = userId;
            next();
        }).catch(err => {
            err.statusCode = 500;
            return next(err);
        })
};

const customPromise = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, decodedToken) => {
            if (err) {
                reject(err);
                return;
            }
            if (decodedToken)
                resolve(decodedToken.userId);
            else
                resolve(null);
        });
    })
}


module.exports = { webAuth, apiAuth };
