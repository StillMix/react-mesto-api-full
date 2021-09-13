const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../middlewares/errors/BadRequest');

const {
  getUser, getUsers, backUser, patchAvatarUser, getInfoUser, patchInfoUser,
} = require('../controllers/users');

// eslint-disable-next-line no-undef
router.get('/me', getInfoUser);

// eslint-disable-next-line no-undef
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().min(24)
      .max(24),
  }),
}), getUser);
// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.post('/backuser', backUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((ava) => {
      if (validator.isURL(ava, { require_protocol: true })) {
        return ava;
      }
      throw new BadRequest('Переданы некорректные данные при получении пользователя.');
    }),
  }),
}), patchAvatarUser);

// eslint-disable-next-line no-undef
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchInfoUser);

module.exports = router;
