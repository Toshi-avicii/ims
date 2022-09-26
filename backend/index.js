const express = require('express');
const app = express();
const env = require('./config/envConfig');
const cors = require('cors');
const connect = require('./config/db');

// db connection 
connect();
app.use(cors());
app.use(express.json());

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Git Server is running on port ${port}`);
});