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

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
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
