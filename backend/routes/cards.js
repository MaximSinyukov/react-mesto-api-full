const router = require('express').Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

router.delete('/cards/:id', deleteCard);
router.get('/cards', getAllCards);
router.post('/cards', createCard);

module.exports = {
  router,
};
