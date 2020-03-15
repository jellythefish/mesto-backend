const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

const updateUserPic = (req, res) => {
  const { link } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: link }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

module.exports = {
  getUsers, getUser, createUser, updateUserInfo, updateUserPic,
};
