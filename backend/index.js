const express = require('express');
const app = express();
const env = require('./config/envConfig');
const cors = require('cors');
const connect = require('./config/db');
const authrouter = require('./routes/authRoute');
const counselorsRoute = require('./routes/counselorsRoute');
const leadsRoute = require('./routes/leadsRoute');

// db connection 
connect();
app.use(cors());
app.use(express.json());

app.use("/api", authrouter);
app.use("/api/counselors", counselorsRoute);
app.use("/api/leads", leadsRoute);

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Git Server is running on port ${port}`);
});