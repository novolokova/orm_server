const { ValidationError } = require('sequelize');

module.exports.errorValidateHandle = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      errors: [{ title: err.message }],
    });
  }
  next(err);
};

module.exports.errorHandle = async (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ title: err.message || 'Server error!!!' }],
  });
};
