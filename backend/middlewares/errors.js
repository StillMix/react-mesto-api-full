/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

module.exports.Errors = (res, err, code) => {
  if (err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  }
  if (code === '404') {
    return res.status(404).send({
      message: 'Страница не найдена.',
    });
  }
  return res.status(500).send({
    message: 'Ошибка по умолчанию.',
  });
};
