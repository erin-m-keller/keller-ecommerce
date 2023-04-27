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
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize, // specifies which Sequelize instance to use for defining the model
    timestamps: false, // false prevents the creation of the 'createdAt' and 'updatedAt' fields
    freezeTableName: true, // false will not pluralize the table name
    underscored: true, // keys will use snake_case instead of camelCase
    modelName: 'category', // the name of the model
  }
);

// export the class
module.exports = Category;
