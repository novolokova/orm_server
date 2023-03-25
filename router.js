const { Router } = require('express');
const UserController = require('./controllers/user.controller');
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
router.get('/users/:idUser', UserController.getOneUserByPk);
router.get('/users/findOne/:idUser', UserController.getOneUserfindOne);

module.exports = router;