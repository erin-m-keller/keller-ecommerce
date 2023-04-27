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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'tag_id',
        unique: true
      }
    },
  },
  {
    sequelize, // specifies which Sequelize instance to use for defining the model
    timestamps: false, // false prevents the creation of the 'createdAt' and 'updatedAt' fields
    freezeTableName: true, // false will not pluralize the table name
    underscored: true, // keys will use snake_case instead of camelCase
    modelName: 'product_tag', // the name of the model
  }
);

// export the class
module.exports = ProductTag;
