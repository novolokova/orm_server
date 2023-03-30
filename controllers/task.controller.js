const createError = require('http-errors');
const { Task } = require('../models');
const { User } = require('../models');

// module.exports.createTask = async (req, res, next) => {
//     try {
//       const { params:{idUser}, body } = req;
//       const task = await Task.create({...body, userId:idUser});
//       res.status(201).send({ data: task });
//     } catch (error) {
//       next(error);
//     }
//   };

// if (!updatedUser) {
//   return next(createError(404, 'User not ////found'));
// }

const checkBody = (body)=>_.pick(body, ['content', 'isDone', 'deadLine'])// захищає від непотрібних данних які можуть зіпсувати нащі данні в БД

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const values = checkBody(body);
    const task = await userInstance.createTask(values);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const tasks = await Task.findAll({ ...paginate });
    if (!tasks) {
      return next(createError(404, 'Tasks not found'));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, paginate = {} } = req;
    const tasks = await userInstance.getTasks({ ...paginate });
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getOneTask = async (req, res, next) => {
  try {
    const { userInstance, taskInstance } = req;
    await userInstance.getTasks();
    res.status(202).send({ data: taskInstance });
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
    if (!deletedTasks) {
      return next(createError(404, 'User not found'));
    }
    res.status(202).send(`All tasks userId:${idUser} removed`);
  } catch (error) {
    next(error);
  }
};


module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      taskInstance,
      params: { idTask },
    } = req;
    await taskInstance.destroy();
    res.status(200).send(`Task id:${idTask} removed`);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
   try {
    const { body, taskInstance } = req;
    const values = checkBody(body);
    const taskUpdated = await taskInstance.update(values, {
      returning: true,
    });
    if (!taskUpdated) {
      return next(createError(400, 'check your data'));
    }
    res.status(202).send({ data: taskUpdated });
  } catch (error) {
    next(error);
  }
};
