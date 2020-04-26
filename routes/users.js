const { celebrate } = require('celebrate');
const router = require('express').Router();
const { getUsers, getUser, getUserById, updateUserInfo, updateUserPic } = require('../controllers/users');
const { getUserSchema, updateUserInfoSchema, updateUserPicSchema } = require('../middlewares').joiSchemas;

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', celebrate(getUserSchema), getUserById);
router.patch('/me', celebrate(updateUserInfoSchema), updateUserInfo);
router.patch('/me/avatar', celebrate(updateUserPicSchema), updateUserPic);

module.exports = router;
