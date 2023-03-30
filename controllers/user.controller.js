const createError = require('http-errors');
const { Op } = require('sequelize'); // Operators
const _ = require('lodash');
const { User } = require('../models'); // db[model.name] = model ---властивість нашої db (саме таблиці "users"---таблиця в множені а модель в однині), робимо деструктурізацію

const checkBody = (body)=>_.pick(body, ['firstName', 'lastName', 'email', 'password', 'birthday', 'isMale'])


module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    
    const createdUser = await User.create(checkBody);
    if (!createdUser) {
      return next(createError(400, 'Check your data'));
    }
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const users = await User.findAll({
      ...paginate,
      attributes: { exclude: ['password'] },
      //   attributes:  ['id', 'email', ['first_name', 'name']] // 'first_name' писати стовбець як у таблиці в БД
      // where: {
      // //   firstName: 'Brad',
      // //   lastName: 'Pitt'

      // //   [Op.or]: { id: [1, 6] },  //  id: 1, 6

      // // [Op.or]:{
      // //     id:{// не дорівнює  id: 6
      // //         [Op.ne]:6
      // //     }
      // // }

      // // [Op.or]:{
      // //     firstName:{ // усіх окрім firstName: Brad
      // //         [Op.ne]: 'Brad'
      // //     }
      // // }

      // },
    });
    if (!users) {
      return next(createError(404, 'Users not found'));
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};


module.exports.getOneUserByPk = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const user = await User.findByPk(idUser, {
      attributes:{
        exclude: ['password']
      }
    });
    if (!user) {
      return next(createError(404, 'User not found'));
    }
       res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};


module.exports.deleteUser = async (req, res, next) => {
  //  1 variant
  // try {
  //   const {
  //     params: { idUser },
  //   } = req;
  //   const userInstance = await User.findByPk(idUser);
  //   //1.1 variant
  //   // const deletedUser = await User.destroy({
  //   //   where: {id: idUser} // *** однаковая запись
  //   // })

  //   // 1.2 variant - not use checkUser in useRouter
  //   if (!userInstance) {
  //     return next(createError(404, 'User not found'));
  //   }
  //   await userInstance.destroy();
  //   userInstance.password = undefined;
  //   res.status(200).send({ data: userInstance });
  // } catch (error) {
  //   next(error);
  // }

  //  2 variant
  try {
    const {
      params: { userInstance },
    } = req;
    await userInstance.destroy();
    userInstance.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

// коли треба update-оновити декілька кортежів
module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const [rowsCount, [updatedUser]] = await User.update(body, {
      // 1 variant
      where: {
        id: {
          [Op.eq]: idUser, // *** *** однаковая запись
        },
      },
      returning: true,
      returning: ['email', 'last_name'],
    });
    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }
    // optimal !!!!
    updatedUser.password = undefined;

    // not optimal !!!!!!
    // const user = updatedUser.get()
    // delete user.password;
    // res.status(202).send({ data: user });

    res.status(202).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// коли треба update-оновити один кортеж
module.exports.updateUserInstance = async (req, res, next) => {
  // don't use checkUser
  // try {
  //   const {
  //     body,
  //     params: { idUser },
  //   } = req;
  //   const userInstance = await User.findByPk(idUser);
  //      if (!userInstance) {
  //     return next(createError(404, 'User not found'));
  //   }
  //   const userUpdated = await userInstance.update(body, {
  //     returning: true,
  //   });
  // if (!userInstance) {
  //   return next(createError(404, 'User not found'));
  // }
  //   userUpdated.password = undefined;
  //   res.status(202).send({ data: userUpdated });
  // } catch (error) {
  //   next(error);
  // }

  // use checkUser
  try {
    const { body, userInstance } = req;
    const userUpdated = await userInstance.update(body, {
      returning: true,
    });
    if (!updatedUser) {
      return next(createError(400, 'check your data'));
    }
    userUpdated.password = undefined;
    res.status(202).send({ data: userUpdated });
  } catch (error) {
    next(error);
  }
};


// !!!!!!!!!!!!
// JSON не може передавати функцію, символ, undefined
