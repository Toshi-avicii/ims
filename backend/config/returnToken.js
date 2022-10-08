const jwt = require('jsonwebtoken');
const env = require('../config/envConfig');

const returnToken = (token) => {
    const returnedToken = jwt.verify(token, env.JWT_KEY, (err, payload) => {
        // if error occurred
        if(err) return err;
        console.log(payload);
        return payload;
    });

    return returnedToken;
}

module.exports = returnToken;