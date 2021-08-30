const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// sync database
const db = require('./models');
db.sequelize.sync();

app.use(bodyParser.json());

app.use(cors());

// Import Routes
const userRoute = require('./routers/User');

app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));