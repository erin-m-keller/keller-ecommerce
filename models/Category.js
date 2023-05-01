// initialize variables
const { Model, DataTypes } = require('sequelize'),
      sequelize = require('../config/connection.js');

// Category class inherits the Sequelize Model class
class Category extends Model {}

/**
 * @init
 * This method initializes the Category model
 * in Sequelize and defines two keys: category_id
 * and category_name.
 */
Category.init(
  {
    /* category id */
    category_id: {
      type: DataTypes.INTEGER, // integer
      primaryKey: true, // primary key
      autoIncrement: true, // auto increment the category_id
      // validate the value
      validate: {
        is: /^\d+$/ // category_id is an integer and not null
      }
    },
    /* category name */
    category_name: {
      type: DataTypes.STRING, // string
      allowNull: false, // do not allow null values
      // validate the value
      validate: {
        is: /^.+$/ // category_name is a string and not null
      }
    }
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
    modelName: 'category', 
  }
);

// export the class
module.exports = Category;
