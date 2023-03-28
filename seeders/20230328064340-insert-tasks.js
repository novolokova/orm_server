'use strict';
const sequelize = require('sequelize');
const _ = require('lodash');
const {User} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // get all id users

    // const users = await sequelize.query('SELECT * FROM "users" ', {
    //   type: sequelize.QueryTypes.SELECT,
    // });

    const users = await User.findAll({attributes:['id']})

    const tasks = users.map((user) => {
      return new Array(_.random(1, 10, false)).fill(null).map((_, i) => ({
        user_id: user.id,
        content: `content task ${i} by user ${user.id}`,
        created_at: new Date(),
        updated_at: new Date(),
      }));
    }).flat(2);

   
    await queryInterface.bulkInsert('tasks', tasks, {});
  },


  // 20230328064340-insert-tasks 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
