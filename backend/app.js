/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const NotFoundError = require('./middlewares/errors/NotFoundError');

dotenv.config();

// eslint-disable-next-line import/no-extraneous-dependencies
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

const { auth } = require('./middlewares/auth');

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', userRouter);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
  // eslint-disable-next-line no-console
  console.log(BASE_PATH);
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;
  res.status(status).json({ err: message });
  return next();
});
