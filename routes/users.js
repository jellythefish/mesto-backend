const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUserInfo, updateUserPic,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserPic);

module.exports = router;
