import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import jwt from 'jsonwebtoken';

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());

app.use(cors());

app.use(async (req, res, next) => {
  try {
    if (req.headers['x-access-token']) {
      const accessToken = req.headers['x-access-token'];
      const { user, exp } = await jwt.verify(accessToken, 'secret');
      //Check if token has expired
      if(exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({ message: "JWT token has expired, please login to obtain a new one"});
      }
      res.locals.loggedInUser = user;
      next();
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
});

// Import Routes
import userRoute from './routers/User';
import fileRoute from './routers/File';
import adminRoute from './routers/Admin';

app.use('/user', userRoute);
app.use('/file', fileRoute);
app.use('/admin', adminRoute);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server started on ${PORT}`));