const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../middlewares/errors/BadRequest');

const {
  deleteCard, getCards, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// eslint-disable-next-line no-undef
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

// eslint-disable-next-line no-undef
router.get('/', getCards);

// eslint-disable-next-line no-undef
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom((ava) => {
      if (validator.isURL(ava, { require_protocol: true })) {
        return ava;
      }
      throw new BadRequest('Переданы некорректные данные при получении пользователя.');
    }),
  }),
}), createCard);

// eslint-disable-next-line no-undef
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

// eslint-disable-next-line no-undef
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

module.exports = router;
