const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const paginate = require('../middlewares/paginate.mw');

const taskRouter = Router();

// ==> app.use('/api', router); ==> router.use('/tasks', taskRouter);- 

taskRouter.post('/users/:idUser', checkUser, TaskController.createTask);
taskRouter.get('/', paginate, TaskController.getAllTasks);
taskRouter.get('/users/:idUser', checkUser, paginate, TaskController.getUserTasks);
taskRouter.get('/users/:idUser/:idTask', checkUser, checkTask, TaskController.getOneTask);
taskRouter.delete('/users/:idUser', TaskController.deleteAllUserTasks);
taskRouter.delete('/:idTask', checkTask, TaskController.deleteTask);

taskRouter.patch('/:idTask', checkTask, TaskController.updateTask);

module.exports = taskRouter;
