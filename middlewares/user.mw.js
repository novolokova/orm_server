const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (!userInstance) {
      throw new Error('user not found');
    }
    req.userInstance = userInstance;// передаем дальше в контроллер через req для обработки в TaskController
    next();
  } catch (error) {
    next(error);
  }
};
