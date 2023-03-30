const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const paginate = require('../middlewares/paginate.mw');
const userRouter = Router();

// ==> app.use('/api', router); ==> router.use('/users', taskRouter);-

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginate, UserController.getAllUsers);
userRouter.get('/:idUser', UserController.getOneUserByPk); // don't use checkUser
userRouter.delete('/:idUser', checkUser, UserController.deleteUser);
userRouter.patch('/:idUser', UserController.updateUser); // don't use checkUser
userRouter.patch('/instance/:idUser',checkUser,UserController.updateUserInstance);

module.exports = userRouter;
