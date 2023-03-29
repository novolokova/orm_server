const createError = require('http-errors');
const _ = require('lodash');
const { Group, User } = require('../models');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ['name', 'imagePath', 'description']);
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, 'Bad request'));
    }
    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, 'user not found'));
    }
    await group.addUser(user);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

  module.exports.getUserGroups = async (req, res, next) => {
    try {
      const { params: {idUser} } = req;
      const userWithGroups = await User.findByPk(idUser, {
        include: [Group]
      })
      if (!userWithGroups) {
        return next(createError(404, 'not found'));
      }

 
      res.status(200).send({ data: userWithGroups });
    } catch (error) {
      next(error);
    }
  };





//   module.exports.createUserGroup = async (req, res, next) => {
//     try {
//     //   const { paginate = {} } = req;
//     //   const tasks = await Task.findAll({ ...paginate });
//     //   res.status(200).send({ data: tasks });
//     } catch (error) {
//       next(error);
//     }
//   };