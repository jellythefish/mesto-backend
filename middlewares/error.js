const defaultErrorStatus = 500;

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || defaultErrorStatus;
  const message = err.message || "Упс, что-то пошло не так...:("

  res.status(status).send({ message });
}

module.exports = errorMiddleware;