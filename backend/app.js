const DB_URL =
  'mongodb+srv://slnegrich:hzzXOK8JOsz21brm@cluster0.vs37vsv.mongodb.net/messenger-db?retryWrites=true&w=majority&appName=Cluster0';
const express = require('express');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/auth', authRoutes);

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
