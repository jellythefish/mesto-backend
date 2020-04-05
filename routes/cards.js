const { celebrate } = require('celebrate');

const router = require('express').Router();
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');
const { createCardSchema, deleteCardSchema, putLikeSchema, deleteLikeSchema } = require('../models/joiSchemas');

router.get('/', getCards);
router.post('/', celebrate(createCardSchema), createCard);
router.delete('/:cardId', celebrate(deleteCardSchema), deleteCard);
router.put('/:cardId/likes', celebrate(putLikeSchema), putLike);
router.delete('/:cardId/likes', celebrate(deleteLikeSchema), deleteLike);

module.exports = router;
