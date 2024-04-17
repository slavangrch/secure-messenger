const DB_URL =
  'mongodb+srv://slnegrich:hzzXOK8JOsz21brm@cluster0.vs37vsv.mongodb.net/messenger-db?retryWrites=true&w=majority&appName=Cluster0';
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const { isAuth } = require('./middleware/isAuth');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,OPTIONS'
  );
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

mongoose
  .connect(DB_URL)
  .then((result) => {
    app.listen(3000);
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
