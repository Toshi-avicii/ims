require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_KEY : process.env.jwt_secret,
    TZ: process.env.TIME_ZONE
}