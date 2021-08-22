/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const BadRequest = require('../middlewares/errors/BadRequest');
const Conflict = require('../middlewares/errors/Conflict');

const JWT_SECRET  = process.env.JWT_SECRET;

// eslint-disable-next-line no-undef
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: users });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
      }
      next(err);
    });
};

module.exports.getInfoUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      if (!users) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
      }
      next(err);
    });
};

module.exports.patchInfoUser = (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about) {
    next(new BadRequest('Поле "имя" или "о себе" не указаны'));
  }

  if (name === null || about === null) {
    next(new BadRequest('Поле "имя" или "о себе" не указаны'));
  }

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
      }
      next(err);
    });
};

module.exports.patchAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
      }
      next(err);
    });
};

// eslint-disable-next-line no-undef
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((Users) => res.send({ data: Users }))
    .catch(next);
};

// eslint-disable-next-line no-undef
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequest('Email или пароль не указаны'));
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new Conflict('Пользователь уже создан'));
      }

      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
          })
            .then((user) => res.status(201).send(user))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
              }
              next(err);
            });
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, res, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .status(200).send({ user: user.toJSON() });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
      }
      next(err);
    });
};
