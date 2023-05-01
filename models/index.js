// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongs to Categories
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Category model key
});

// Categories has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Product model key
});

// Products belong to many Tags
Product.belongsToMany(Tag, {
  through: ProductTag, // ProductTag is the join table
  foreignKey: 'product_id', // ProductTag model key, references id in Product model
});

// Tags belong to many Products 
Tag.belongsToMany(Product, {
  through: ProductTag, // ProductTag is the join table
  foreignKey: 'tag_id', // ProductTag model key, references tag_id in Tag model
});

// export the models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
