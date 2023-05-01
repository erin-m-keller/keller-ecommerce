// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongs to Categories
Product.belongsTo(Category, {
  // Category model key
  foreignKey: 'category_id',
  // If a category is deleted, remove the products 
  // associated with that category to maintain 
  // referential integrity 
  onDelete: 'CASCADE' 
});

// Categories have many Products
Category.hasMany(Product, {
  // Product model key
  foreignKey: 'category_id',
  // If a category is deleted, this will delete
  // the products that have that id from the
  // Product model to maintain referential
  // integrity
  onDelete: 'CASCADE' 
});

// Products belong to many Tags
Product.belongsToMany(Tag, {
  // ProductTag is the join table
  through: ProductTag, 
  // ProductTag model key, references id in Product model
  foreignKey: 'product_id',
  // ProductTag rows that reference the deleted Product 
  // will be deleted, all related Tag rows that reference
  // the deleted ProductTag rows will also be deleted
  // to maintain referential integrity 
  onDelete: 'CASCADE' 
});

// Tags belong to many Products 
Tag.belongsToMany(Product, {
  through: ProductTag, // ProductTag is the join table
  foreignKey: 'tag_id', // ProductTag model key, references tag_id in Tag model
  onDelete: "CASCADE" //
});

// export the models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
