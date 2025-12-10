export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (status === 500) {
    console.error(err);
  }

  const response = {
    status,
    message: err.message || "Internal server error",
  };

  if (err.details) {
    response.errors = err.details;
  }

  res.status(status).json(response);
};
