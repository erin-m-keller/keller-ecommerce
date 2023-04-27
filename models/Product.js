// initialize variables
const { Model, DataTypes } = require('sequelize'),
      sequelize = require('../config/connection');

// Category class inherits the Sequelize Model class
class Product extends Model {}

/**
 * @init
 * This method initializes the Product model
 * in Sequelize and defines five keys: id,
 * product_name, price, stock and category_id
 */
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id',
        unique: true
      }
    },
  },
  {
    sequelize, // specifies which Sequelize instance to use for defining the model
    timestamps: false, // false prevents the creation of the 'createdAt' and 'updatedAt' fields
    freezeTableName: true, // false will not pluralize the table name
    underscored: true, // keys will use snake_case instead of camelCase
    modelName: 'product', // the name of the model
  }
);

// export the class
module.exports = Product;
