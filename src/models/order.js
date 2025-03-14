'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    status: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled')
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};