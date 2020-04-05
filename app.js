require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const { loginSchema, signUpSchema } = require('./models/joiSchemas');

const router = require('./routes');
const { requestLogger, errorLogger, errorMiddleware, auth } = require('./middlewares');
const { login, createUser } = require('./controllers/users');

const { PORT, DATABASE } = require('./config');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// adding middlewares
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// adding logger
app.use(requestLogger);

// adding routes
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate(loginSchema), login);
app.post('/signup', celebrate(signUpSchema), createUser);
app.use('/users', auth, router.users);
app.use('/cards', auth, router.cards);


app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден!' });
});

app.use(errorMiddleware);
