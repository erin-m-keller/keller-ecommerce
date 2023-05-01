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
    /* id */
    id: {
      type: DataTypes.INTEGER, // integer
      primaryKey: true, // primary key
      autoIncrement: true, // auto increment the id
      // validate the value
      validate: {
        is: /^\d+$/ // id is an integer and not null
      }
    },
    /* product name */
    product_name: {
      type: DataTypes.STRING, // string
      allowNull: false, // do not allow null values
      // validate the value
      validate: {
        is: /^.+$/ // product_name is a string and not null
      }
    },
    /* price */
    price: {
      type: DataTypes.DECIMAL(10, 2), // decimal - 10 digits and 2 decimal places
      allowNull: false, // do not allow null values
      // validate the value
      validate: {
        isDecimal: true, // validates the price is decimal
        is: /^\d+(\.\d{1,2})?$/ // contains only digits, allows decimal point and up to two more digits
      }
    },
    /* stock */
    stock: {
      type: DataTypes.INTEGER, // integer
      allowNull: true, // allow null values
      // validate the value
      validate: {
        is: /^\d*$/ // stock is an integer, can be null
      }
    },
    /* category id */
    category_id: { 
      type: DataTypes.INTEGER, // integer
      allowNull: false, // do not allow null values
      // foreign key to category model
      references: {
        model: 'category', // model to reference
        key: 'category_id', // key to reference
        unique: true  // disallows duplicate values
      },
      // validate the value
      validate: {
        is: /^\d+$/ // category_id is an integer and not null
      }
    },
  },
  {
    // specifies which Sequelize 
    // instance to use for defining 
    // the model
    sequelize, 
    // false prevents the creation of 
    // the 'createdAt' and 'updatedAt' 
    // fields
    timestamps: false, 
    // true will prevent sequelize
    // from pluralizing the names
    freezeTableName: true,
    // keys will use snake_case instead 
    // of camelCase 
    underscored: true, 
    // the name of the model
    modelName: 'product', 
  }
);

// export the class
module.exports = Product;
