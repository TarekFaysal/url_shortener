const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to Database
connectDB();

// Allow json format
app.use(express.json({extended: false}));

//Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));