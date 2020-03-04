const router = require('express').Router();
const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, '../data/users.json');
let users = fs.readFileSync(filepath, 'utf8', (err, data) => {
  if (err) {
      console.log(err);
      return;
  }
  return data;
});
try {
  users = JSON.parse(users);
} catch (err) {
  console.log("JSON parsing error occured: ", err.message);
}

const getUsers = (req, res, next) => {
  res.send(users);
}

const getUser = (req, res, next) => {
  const id = req.params.id;

  const userIsFound = users.find((user) => {
    return user._id === id;
  });
  if (!userIsFound) {
    return next({status: 404, message: "Нет пользователя с таким id"})
  }

  res.send(userIsFound);
}

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;