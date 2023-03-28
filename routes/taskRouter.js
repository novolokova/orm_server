const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const paginate = require('../middlewares/paginate.mw');

const taskRouter = Router();

// ==> app.use('/api', router); ==> router.use('/tasks', taskRouter);- 

taskRouter.post('/users/:idUser', checkUser, TaskController.createTask);
taskRouter.get('/', paginate, TaskController.getAllTasks);
taskRouter.get('/users/:idUser', checkUser, TaskController.getUserTasks);
taskRouter.get('/users/:idUser/:idTask',checkUser, checkTask, TaskController.getOneTask);
taskRouter.delete('/:idTask/users/:idUser', checkUser, checkTask, TaskController.deleteUserTask);
taskRouter.delete('/users/:idUser', TaskController.deleteAllUserTasks);
taskRouter.patch('/users/:idUser/:idTask',checkUser, checkTask, TaskController.updateTask);

module.exports = taskRouter;
