const router = require('express').Router();
const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, '../data/cards.json');
let cards = fs.readFileSync(filepath, (err, data) => {
  if (err) {
      console.log(err);
      return;
  }
  return data;
});
try {
  cards = JSON.parse(cards);
} catch (err) {
  console.log("JSON parsing error occured: ", err.message);
}

const getCards = (req, res, next) => {
  res.send(cards);
}

router.get("/", getCards);

module.exports = router;