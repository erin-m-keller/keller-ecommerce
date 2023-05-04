// initialize variables
const router = require('express').Router(),
      { Tag, Product, ProductTag } = require('../../models');

/* -- localhost:3001/api/tags -- */

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
    // sequelize method to find all tags
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
    res.status(500).json(err);
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
    // sequelize method to find a specific tag
    const tag = await Tag.findOne({
      where: { tag_id: tagId }, // where tag_id === params value
      include: [Product], // include all associated Products 
    });
    // if no tag is found
    if (!tag) {
      // return status 400 with not found message
      return res.status(404).json({ message: 'Tag not found' });
    }
    // return the data
    res.json(tag);
  }
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json(err);
  }
});

/**
 * @createNewTag
 * This route will take the name from the
 * request body, and use it to create a
 * new tag
 */
router.post('/', async (req, res) => {
  // initialize variables
  const { name } = req.body;
  // error handler
  try {
    // sequelize method to create a new tag
    const tag = await Tag.create({ tag_name: name });
    // return status 200 with data
    res.status(200).json(tag);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json(err);
  }
});

/**
 * @updateTag
 * This route will update a category
 * name based on the ID in the params
 */
router.put('/:id', async (req, res) => {
  // initialize variables
  const { name } = req.body,
        tagId = req.params.id;
  // error handler
  try {
    // sequelize method to update a tag name based on ID
    await Tag.update(
      { tag_name: name }, // update the tag name
      { where: { tag_id: tagId } } // where tag_id === params value
    );
    // return status 200 with data
    const updatedTag = await Tag.findByPk(tagId, 
      { include: Product } // include all associated products
    );
    // return status 200 with data
    res.status(200).json(updatedTag);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json(err);
  }
});

/**
 * @deleteTag
 * This route will delete a tag
 * based on the ID in the params
 */
router.delete('/:id', async (req, res) => {
  // initialize variables
  const tagId = req.params.id;
  // error handler
  try {
    // sequelize method to delete a tag 
    await Tag.destroy(
      { where: { tag_id: tagId } } // where tag_id === params value
    );
    // get the updated category data
    const updatedTagList = await Tag.findByPk(tagId, 
      { include: Product } // include all associated products
    );
    // return status 200 with data
    res.status(200).json(updatedTagList);
  } 
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json(err);
  }
});

// export the routes
module.exports = router;
