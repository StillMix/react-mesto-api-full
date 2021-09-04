/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./middlewares/errors/NotFoundError');
const BadRequest = require('./middlewares/errors/BadRequest');

dotenv.config();

// eslint-disable-next-line import/no-extraneous-dependencies
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://localhost:3000',
  'http://smfrtontendmesto.nomoredomains.rocks',
  'https://smfrtontendmesto.nomoredomains.rocks',
];

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(cookieParser());
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

const { auth } = require('./middlewares/auth');

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', userRouter);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
  // eslint-disable-next-line no-console
  console.log(BASE_PATH);
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err) {
    next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
  }
});
