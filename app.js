const express = require('express');
const { ValidationError } = require('sequelize');
const router = require('./routes');
const app = express();
app.use(express.static('public'))// можливість працювати з статичними файлами (з папки public)
app.use(express.json()); // Content-Type: application/json - если не пропишем в requests то этот метод не будет работать не сможет читать

//http://localhost:3000/api
app.use('/api', router);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      errors: [{ title: err.message }],
    });
  }
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ title: err.message || 'Server error!!!'}],
  });
});

module.exports = app;
