// initialize variables
const router = require('express').Router(),
      { Category, Product } = require('../../models');

/* -- localhost:3001/api/categories -- */

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
    // sequelize method to find all categories 
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
    res.status(500).json(err);
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
    // sequelize method to find specific category
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
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json(err);
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
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json(err);
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
    // sequelize method to update a database entry
    await Category.update(
      { category_name: name }, // update the category name
      { where: { category_id: categoryId } } // where category_id === params value
    );
    // return status 200 with data
    const updatedCategory = await Category.findByPk(categoryId, 
      { include: Product }
    );
    // if null, return 404 with message
    if (!updatedCategory) return res.status(404).json({ message: 'Category ID not found in the database' });
    // else, return status 200 with data
    res.status(200).json(updatedCategory);
  } 
  // an error was detected 
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json(err);
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
    // sequelize method to delete a category
    await Category.destroy(
      { where: { category_id: categoryId } } // where category_id === params value
    );
    // get the new category list
    const updatedCategory = await Category.findByPk(categoryId, 
      { include: Product } // include all associated products
    );
    // return success message
    res.status(200).json({ message: 'Successfully deleted the category with the ID ' + categoryId });
  } 
  // an error was detected 
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json(err);
  }
});

// export the routes
module.exports = router;
