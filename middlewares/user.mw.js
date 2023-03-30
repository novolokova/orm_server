const createError = require('http-errors');
const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (!userInstance) {
      return next(createError(404, 'User not found'));
    }
    req.userInstance = userInstance;// передаем дальше в контроллер через req для обработки в Controller
    next();
  } catch (error) {
    next(error);
  }
};
