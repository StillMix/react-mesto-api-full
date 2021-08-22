/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const BadRequest = require('../middlewares/errors/BadRequest');
const Forbidden = require('../middlewares/errors/Forbidden');

// eslint-disable-next-line no-undef
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Нет карточки с таким id'));
      } else if (card.owner == req.user._id) {
        Card.findByIdAndDelete(card._id)
          .then((cardDel) => res.status(200).send({ data: cardDel }));
      } else {
        next(new Forbidden('Можно удалять только свои карточки'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при удалении карточки.'));
      }
      next(err);
    });
};

// eslint-disable-next-line no-undef
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// eslint-disable-next-line no-undef
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link) {
    next(new BadRequest('Поле "имя" или "ссылка" не указаны'));
  }

  Card.create({ name, link, owner: req.user._id })
    .then((Cards) => res.send({ data: Cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Нет карточки с таким id'));
      }
      res.send({ data: card.likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при лайке карточки.'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Нет карточки с таким id'));
    }
    res.send({ data: card.likes });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные при дизлайке карточки.'));
    }
    next(err);
  });
