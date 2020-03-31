const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('Вы не имеете прав на удаление данной карточки'));
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
