const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, patchAvatarUser, getInfoUser, patchInfoUser,
} = require('../controllers/users');

// eslint-disable-next-line no-undef
router.get('/me', getInfoUser);

// eslint-disable-next-line no-undef
router.get('/:id', getUser);
// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), patchAvatarUser);

// eslint-disable-next-line no-undef
router.patch('/me', patchInfoUser);

module.exports = router;
