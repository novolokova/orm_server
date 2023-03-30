'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'users_to_groups',
        foreignKey: 'groupId',
      });
    }
  }

  Group.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      imagePath: {
        field: 'image_path',
        type: DataTypes.TEXT,
      },
      descriptition: {
        type: DataTypes.STRING,
      },
      isAdult:{
        type: DataTypes.BOOLEAN,
        field:'is_adult',
        allowNull: false,
        defaultValue:true
      }
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,// ті поля котрі йдуть за замовчуванням щоб переводилися у snake-case field: 'updated_at' ....
    }
  );
  return Group;
};
