// this middleware will check whether the token we're getting from the frontend is valid or not.
const jwt = require('jsonwebtoken');
const env = require('../config/envConfig');

function authenticateAdminToken(req, res, next) {
    // extract the token from the request authorization header
    const authHeader = req.headers['authorization'];

    // split the user information from the token
    const token = authHeader && authHeader.split(' ')[1];

    // check if the token is null or if the request header is set or not
    if(token === null || !token) return res.status(401).json({ msg: 'User not authorized' });

    // verify if the login token matches the server token
    jwt.verify(token, env.JWT_KEY, (err, payload) => {
        // if error occurred
        if(err) return res.status(401).json({ msg: err.message });
        // console.log(user); this holds the information passed while logging the counselor.

        // check if the token is expired,
        // const currentDate = new Date().getTime();
        // if(currentDate > user.exp) {
        //     res.status(401).json({
        //         msg: 'Token expired'
        //     })
        // }
        // pass to the next middleware if everything is ok.
        if(payload.role !== "admin") {
            res.status(401).json({
                msg: "User is not an admin"
            })
        } 
            
        next();
    });
}

module.exports = authenticateAdminToken;