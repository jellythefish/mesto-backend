const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleleLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleleLike);

module.exports = router;
