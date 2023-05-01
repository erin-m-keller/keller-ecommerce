// initialize variables
const router = require('express').Router(),
      { Category, Product } = require('../../models');

/* localhost:3001/api/categories */

/**
 * @getAllCategories
 * This route will retrieve all Category 
 * records and join them with their associated 
 * Product records based on the foreign 
 * key relationship defined in the model
 */
router.get('/', async (req, res) => {
  // error handler
  try {
    // sequelize method to find all categories in the category table
    const categories = await Category.findAll({
      include: [Product], // include all associated Products
    });
    // return the data
    res.json(categories);
  } 
  // an error was detected
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @getSpecificCategory
 * This route will retrieve one Category 
 * record based on an id, and join them 
 * with their associated Product records 
 * based on the foreign key relationship 
 * defined in the model
 */
router.get('/:id', async (req, res) => {
  // initialize variables
  const categoryId = req.params.id;
  // error handler
  try {
    // sequelize method to find one category in the category table
    const category = await Category.findOne({
      where: { category_id: categoryId }, // where category_id === params value
      include: [Product], // include all associated Products 
    });
    // if no category is found
    if (!category) {
      // return status 400 with not found message
      return res.status(404).json({ message: 'Category not found' });
    }
    // return the data
    res.json(category);
  }
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @createNewCategory
 * This route will take the name from the
 * request body, and use it to create a
 * new category
 */
router.post('/', async (req, res) => {
  // initialize variables
  const { name } = req.body;
  // error handler
  try {
    // sequelize method to create a new database entry
    const category = await Category.create({ category_name: name });
    // return status 200 with data
    res.status(200).json(category);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @updateCategory
 * This route will update a category
 * name based on the ID in the params
 */
router.put('/:id', async (req, res) => {
  // initialize variables
  const { name } = req.body,
        categoryId = req.params.id;
  // error handler
  try {
    // sequelize method to create a new database entry
    const category = await Category.update(
      { category_name: name },
      { where: { category_id: categoryId } } // where category_id === params value
    );
    // return status 200 with data
    const updatedCategory = await Category.findByPk(categoryId, { include: Product });
    // return status 200 with data
    res.status(200).json(updatedCategory);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @deleteCategory
 * This route will delete a category
 * based on the ID in the params
 */
router.delete('/:id', async (req, res) => {
  // initialize variables
  const categoryId = req.params.id;
  // error handler
  try {
    // sequelize method to create a new database entry
    const category = await Category.destroy(
      { where: { category_id: categoryId } } // where category_id === params value
    );
    // get the updated category data
    const updatedCategoryList = await Category.findAll({
      include: [Product], // include all associated Products
    });
    // return status 200 with data
    res.status(200).json(updatedCategoryList);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

// export the routes
module.exports = router;
