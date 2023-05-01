const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

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
      where: { category_id: categoryId }, // where id === params value
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
 * This route will retrieve one Category 
 * record based on an id, and join them 
 * with their associated Product records 
 * based on the foreign key relationship 
 * defined in the model
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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
