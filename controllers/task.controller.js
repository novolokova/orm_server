const {Task} = require('../models');

module.exports.createTask = async (req, res, next) => {
    try {
      const { params:{idUser}, body } = req;
      const task = await Task.create({...body, userId:idUser});
      res.status(201).send({ data: task });
    } catch (error) {
      next(error);
    }
  };

