'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId:{
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate:'cascade',
      },
      groupId:{
        field: 'group_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'groups',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate:'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_to_groups');
  },
};
