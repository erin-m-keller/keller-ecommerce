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
    /* tag id */
    tag_id: {
      type: DataTypes.INTEGER, // integer
      primaryKey: true, // primary key
      autoIncrement: true, // auto increment the tag_id
      // validate the value
      validate: {
        is: /^\d+$/ // tag_id is an integer and not null
      }
    },
    /* tag name */
    tag_name: {
      type: DataTypes.STRING, // string
      allowNull: false, // do not allow null values
      // validate the value
      validate: {
        is: /^.+$/ // tag_name is a string and not null
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
    modelName: 'tag', 
  }
);

// export the class
module.exports = Tag;
