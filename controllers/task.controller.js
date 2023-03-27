const { Task } = require('../models');

// module.exports.createTask = async (req, res, next) => {
//     try {
//       const { params:{idUser}, body } = req;
//       const task = await Task.create({...body, userId:idUser});
//       res.status(201).send({ data: task });
//     } catch (error) {
//       next(error);
//     }
//   };

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAllUserTasks = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const deletedTasks = await Task.destroy({
      where: { userId: idUser },
    });
    res.status(202).send(`All tasks userId:${idUser} removed`);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const {
      taskInstance,
      params: { idTask },
    } = req;
    await taskInstance.destroy(idTask);
    res.status(200).send(`Task id:${idTask} removed`);
  } catch (error) {
    next(error);
  }
};

module.exports.getOneTask = async (req, res, next) => {
  try {
    const {
      params: { idTask, idUser },
    } = req;
    const task = await Task.findOne({
      where: { id: idTask, userId: idUser },
    });
    res.status(202).send({ data: task.content });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { idTask, idUser },
    } = req;
    const findTask = await Task.findOne({
      where: { id: idTask, userId: idUser },
    });
    const taskUpdated = await findTask.update(body, {
      returning: true,
    });
    res.status(202).send({ data: taskUpdated });
  } catch (error) {
    next(error);
  }
};
