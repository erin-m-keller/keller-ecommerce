// initialize variables
const { Model, DataTypes } = require('sequelize'),
      sequelize = require('../config/connection');

// Category class inherits the Sequelize Model class
class ProductTag extends Model {}

/**
 * @init
 * This method initializes the ProductTag model
 * in Sequelize and defines three keys: id,
 * product_id and tag_id
 */
ProductTag.init(
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
    /* product id */
    product_id: {
      type: DataTypes.INTEGER, // integer
      allowNull: false, // do not allow null values
      // foreign key to product model
      references: {
        model: 'product', // model to reference
        key: 'id', // key to reference
        unique: true // disallows duplicate values
      },
      // validate the value
      validate: {
        is: /^\d+$/ // product_id is an integer and not null
      }
    },
    /* tag id */
    tag_id: {
      type: DataTypes.INTEGER, // integer
      allowNull: false, // do not allow null values
      // foreign key to tag model
      references: {
        model: 'tag', // model to reference
        key: 'tag_id', // key to reference
        unique: true // disallows duplicate values
      },
      // validate the value
      validate: {
        is: /^\d+$/ // tag_id is an integer and not null
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
    modelName: 'product_tag', 
  }
);

// export the class
module.exports = ProductTag;
