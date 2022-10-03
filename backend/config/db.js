const mongoose = require('mongoose');
const env = require('./envConfig');

const connect = async() => {
    try{
        const connection = await mongoose.connect(env.MONGODB_URI);
        if(connection) {
            console.log('connected');
        }
    } catch(err) {
        console.log(err.message);
        process.exit;
    }
}

module.exports = connect;
