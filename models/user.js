'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'first_name',
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'last_name',
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        field: 'password_hash',
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          // isBefore: new Date().toISOString()
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('check birthday');
            }
          },
        },
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        field: 'is_male',
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users'
    }
  );
  return User;
};
