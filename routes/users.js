const { celebrate } = require('celebrate');
const router = require('express').Router();
const { getUsers, getUser, updateUserInfo, updateUserPic } = require('../controllers/users');
const { getUserSchema, updateUserInfoSchema, updateUserPicSchema } = require('../models/joiSchemas');

router.get('/', getUsers);
router.get('/:id', celebrate(getUserSchema), getUser);
router.patch('/me', celebrate(updateUserInfoSchema), updateUserInfo);
router.patch('/me/avatar', celebrate(updateUserPicSchema), updateUserPic);

module.exports = router;
