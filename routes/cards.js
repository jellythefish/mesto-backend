const { celebrate } = require('celebrate');

const router = require('express').Router();
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');
const { createCardSchema, cardIdSchema } = require('../middlewares').joiSchemas;

router.get('/', getCards);
router.post('/', celebrate(createCardSchema), createCard);
router.delete('/:cardId', celebrate(cardIdSchema), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdSchema), putLike);
router.delete('/:cardId/likes', celebrate(cardIdSchema), deleteLike);

module.exports = router;
