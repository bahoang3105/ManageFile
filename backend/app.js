import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());

app.use(cors());

// Import Routes
import userRoute from './routers/User';
import fileRoute from './routers/File';

app.use('/user', userRoute);
app.use('/file', fileRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));