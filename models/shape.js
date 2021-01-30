'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shape extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Shape.belongsTo(models.User, {
        as: 'user', foreignKey: 'UserId', onDelete: 'CASCADE'
      })
    }
  };
  Shape.init({
    name: DataTypes.STRING,
    dimensions: DataTypes.JSONB,
    area: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Shape',
  });
  return Shape;
};