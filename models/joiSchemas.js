const { Joi } = require('celebrate');
const { urlRegex } = require('../middlewares');

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(32),
  }),
};

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(urlRegex).error(new Error('The url is invalid!')),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(32),
  }),
};

const getUserSchema = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
};

const updateUserInfoSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateUserPicSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex).error(new Error('The url is invalid!')),
  }),
};

const createCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex).error(new Error('The url is invalid!')),
  }),
};

const deleteCardSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

const putLikeSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

const deleteLikeSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = {
  loginSchema,
  signUpSchema,
  getUserSchema,
  updateUserInfoSchema,
  updateUserPicSchema,
  createCardSchema,
  deleteCardSchema,
  putLikeSchema,
  deleteLikeSchema,
};
