// initialize variables
const router = require('express').Router(),
      { Tag, Product, ProductTag } = require('../../models');

/* localhost:3001/api/tags */

/**
 * @getAllTags
 * This route will retrieve all Tag 
 * records and join them with their associated 
 * Product records based on the foreign 
 * key relationship defined in the model
 */
router.get('/', async (req, res) => {
  // error handler
  try {
    // sequelize method to find all tags in the tag table
    const tags = await Tag.findAll({
      include: [Product], // include all associated Products
    });
    // return the data
    res.json(tags);
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
 * @getSpecificTag
 * This route will retrieve one Tag 
 * record based on an id, and join them 
 * with their associated Product records 
 * based on the foreign key relationship 
 * defined in the model
 */
router.get('/:id', async (req, res) => {
  // initialize variables
  const tagId = req.params.id;
  // error handler
  try {
    // sequelize method to find one tag in the tag table
    const category = await Tag.findOne({
      where: { tag_id: tagId }, // where tag_id === params value
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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
