// initialize variables
const { Model, DataTypes } = require('sequelize'),
      sequelize = require('../config/connection.js');

// Category class inherits the Sequelize Model class
class Tag extends Model {}

/**
 * @init
 * This method initializes the Tag model
 * in Sequelize and defines two keys: tag_id
 * and tag_name
 */
Tag.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize, // specifies the instance of the Sequelize class to be used for defining the model
    timestamps: false, // false prevents the creation of the 'createdAt' and 'updatedAt' fields
    freezeTableName: true, // false will not pluralize the table name
    underscored: true, // keys will use snake_case instead of camelCase
    modelName: 'tag', // the name of the model
  }
);

// export the class
module.exports = Tag;
