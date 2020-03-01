const router = require('express').Router();
const fs = require("fs");
let users = fs.readFileSync("./data/users.json", 'utf8', (err, data) => {
  if (err) {
      console.log(err);
      return;
  }
  return data;
});
users = JSON.parse(users);

const getUsers = (req, res, next) => {
  res.send(users);
}

const getUser = (req, res, next) => {
  const id = req.params.id;
  debugger;
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