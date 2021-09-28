/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../middlewares/errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about:
  {
    type: String,
    default: 'Исследователь океана',
    minlength: 2,
    maxlength: 30,
  },
  avatar:
  {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (ava) => validator.isURL(ava, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неверная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (ava) => validator.isEmail(ava),
      message: 'Неверная почта',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, res, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log(user);
        throw new Unauthorized('Неправильные почта или пароль');
      } else {
        console.log(user);
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new Unauthorized('Неправильные почта или пароль');
            } else {
              console.log(user);
              return user;
            }
          });
      }
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
