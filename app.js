const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const { logger, errorMiddleware } = require('./middlewares');

const { PORT, DATABASE, USERID } = require('./config');

// launching web-server
const app = express();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// connecting to database
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// adding middlewares
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: USERID,
  };
  next();
});

// adding routes
app.use('/users', router.users);
app.use('/cards', router.cards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден!' });
});
app.use(errorMiddleware);
