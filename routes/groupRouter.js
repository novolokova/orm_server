const path = require("path") // module Node
const { Router } = require('express');
const multer = require('multer');//Middleware module - express
const groupRouter = Router();
const GroupController = require('../controllers/group.controller');


// const upload = multer({
//     dest:path.resolve(__dirname, '../public/images') // прилітає за замовчуванням, в неправильному для нас вигляді
// })


// обробляємо, щоб прилітав в певному вигляді 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)// file.originalname - то що прилітає до нас з клієнта
    }
  })
    const upload = multer({ storage: storage })// Middleware-multer


// ==> app.use('/api', router); ==> router.use('/groups', taskRouter);- 

groupRouter.post('/', upload.single('img'), GroupController.createUserGroup);
//groupRouter.patch('/:idGroup/users/:idUser', GroupController.addUserGroup);
groupRouter.patch('/:idGroup/image', upload.single('image'), GroupController.addImageGroup);

groupRouter.get('/users/:idUser', GroupController.getUserGroups);

module.exports = groupRouter;
