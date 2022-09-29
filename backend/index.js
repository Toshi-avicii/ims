const express = require('express');
const app = express();
const env = require('./config/envConfig');
const cors = require('cors');
const connect = require('./config/db');
const authRoute = require('./routes/authRoute');
const counselorsRoute = require('./routes/counselorsRoute');
const leadsRoute = require('./routes/leadsRoute');
const adminRoute = require('./routes/adminRoute');

// db connection 
connect();
app.use(cors());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api/counselors", counselorsRoute);
app.use("/api/leads", leadsRoute);
app.use("/api/admin", adminRoute)

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Git Server is running on port ${port}`);
});