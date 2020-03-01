const express = require('express');
const { PORT = 3000 } = process.env;
const router = require("./routes")
const { logger, errorMiddleware } = require("./middlewares")

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

app.use(logger);
app.use(express.static(__dirname + "/public"));
app.use("/users", router.users);
app.use("/cards", router.cards);
app.get('*', (req, res) => {
  res.status(404).send({message: "Запрашиваемый ресурс не найден!"});
});
app.use(errorMiddleware);