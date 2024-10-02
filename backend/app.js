require('dotenv').config({ path: '../.env' });
const DB_URL = process.env.DB_URL;
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const { isAuth } = require('./middleware/isAuth');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { socketManager } = require('./socket/socket');
const path = require('path');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/message', isAuth, messageRoutes);
app.use('/users', isAuth, userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || 'An error occurred';
  const data = error.data || [];
  res.status(status).json({ message: message, data: data });
});
const onlineUserIds = {};

mongoose
  .connect(DB_URL)
  .then((result) => {
    const server = app.listen(3000);
    const io = require('./socket/socketHelper').init(server);
    socketManager();
  })
  .catch((err) => {
    console.log(err);
  });
