const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller')
const router = Router();

//method & controllers
//http://localhost:3000/api/test
//router.get('/test', ()=>{})

//users
//http://localhost:3000/api
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/users/:idUser', UserController.updateUser);
router.patch('/users/instance/:idUser', UserController.updateUserInstance);
router.delete('/users/:idUser', UserController.deleteUser);
router.get('/users/:idUser', UserController.getOneUserByPk); //1 variant
router.get('/users/findOne/:idUser', UserController.getOneUserfindOne);//2 variant


router.post('/users/:idUser/tasks', TaskController.createTask);

module.exports = router;