const router = require('express').Router();
const fs = require("fs");
let cards = fs.readFileSync('./data/cards.json', (err, data) => {
  if (err) {
      console.log(err);
      return;
  }
  return data;
});
cards = JSON.parse(cards);

const getCards = (req, res, next) => {
  res.send(cards);
}

router.get("/", getCards);

module.exports = router;