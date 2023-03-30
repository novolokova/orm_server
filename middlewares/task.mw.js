const createError = require('http-errors');
const { Task } = require('../models');

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const taskInstance = await Task.findByPk(idTask);
    if (!taskInstance) {
      return next(createError(404, 'Task not found'));
    }
    req.taskInstance = taskInstance;
    next();
  } catch (error) {
    next(error);
  }
};
