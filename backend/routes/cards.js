const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const {
  deleteCard, getCards, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// eslint-disable-next-line no-undef
router.delete('/:id', celebrate({
  params: Joi.string().hex().min(24)
    .max(24),
}), deleteCard);

// eslint-disable-next-line no-undef
router.get('/', getCards);

// eslint-disable-next-line no-undef
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(
      (ava) => validator.isURL(ava, { require_protocol: true }),
    ),
  }),
}), createCard);

// eslint-disable-next-line no-undef
router.delete('/:id/likes', celebrate({
  params: Joi.string().hex().min(24)
    .max(24),
}), dislikeCard);

// eslint-disable-next-line no-undef
router.put('/:id/likes', celebrate({
  params: Joi.string().hex().min(24)
    .max(24),
}), likeCard);

module.exports = router;
