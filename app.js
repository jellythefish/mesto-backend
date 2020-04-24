require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const { loginSchema, signUpSchema } = require('./middlewares').joiSchemas;

const router = require('./routes');
const { requestLogger, errorLogger, errorMiddleware, auth } = require('./middlewares');
const { login, createUser } = require('./controllers/users');

const { PORT, DATABASE } = require('./config');

// запускаем веб-сервер
const app = express();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// соединяемся с базой данных
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
});

// добавляем мидлвары
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// добавляем логгер
app.use(requestLogger);

// добавляем роуты
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate(loginSchema), login);
app.post('/signup', celebrate(signUpSchema), createUser);
app.use('/users', auth, router.users);
app.use('/cards', auth, router.cards);


app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден!' });
});

app.use(errorMiddleware);
