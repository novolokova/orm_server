const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const userRouter = Router();

// ==> app.use('/api', router); ==> router.use('/users', taskRouter);- 

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:idUser', UserController.getOneUserByPk); //1 variant
userRouter.get('/:idUser', checkUser, UserController.getOneUserfindOne);//2 variant
userRouter.delete('/:idUser', checkUser, UserController.deleteUser);
userRouter.patch('/:idUser', checkUser, UserController.updateUser);
userRouter.patch('/instance/:idUser',checkUser, UserController.updateUserInstance);


module.exports = userRouter;