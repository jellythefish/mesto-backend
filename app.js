const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const { logger, errorMiddleware } = require('./middlewares');

const { PORT = 3000 } = process.env;

// launching web-server
const app = express();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// connecting to database
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// adding middlewares
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5e6bc28ee903236464c8f3ef',
  };
  next();
});

// adding routes
app.use('/users', router.users);
app.use('/cards', router.cards);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден!' });
});
app.use(errorMiddleware);
