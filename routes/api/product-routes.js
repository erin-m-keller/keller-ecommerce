// initialize variables
const router = require('express').Router(),
      { Product, Category, Tag, ProductTag } = require('../../models');

/* -- localhost:3001/api/products -- */

/**
 * @getAllProducts
 * This route will retrieve all Product 
 * records and join them with their associated 
 * Category and Tag records based on the foreign 
 * key relationship defined in the model
 */
router.get('/', async (req, res) => {
  // error handler
  try {
    // sequelize method to find all products
    const products = await Product.findAll({
      include: [Category, Tag], // include all associated Category and Tag data
    });
    // return the data
    return res.json(products);
  } 
  // an error was detected
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    return res.status(500).json(err);
  }
});

/**
 * @getSpecificProduct
 * This route will retrieve one Product 
 * record based on an id, and join them 
 * with their associated Category and 
 * Tag records based on the foreign 
 * key relationship defined in the model
 */
router.get('/:id', async (req, res) => {
  // initialize variables
  const productId = req.params.id;
  // error handler
  try {
    // sequelize method to find a specific tag
    const product = await Product.findOne({
      where: { id: productId }, // where id === params value
      include: [Category, Tag], // include all associated Categories and Tags 
    });
    // if no product is found
    if (!product) {
      // return status 400 with not found message
      return res.status(404).json({ message: 'Product not found' });
    }
    // return the data
    return res.json(product);
  }
  // an error was detected 
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    return res.status(500).json(err);
  }
});

/**
 * @createNewProduct
 * This route will take the data from the
 * request body, and use it to create a
 * new product. req.body expects product_name,
 * price, stock, tagId array, and category_id
 */
router.post('/', async (req, res) => {
  // error handler
  try {
    // sequelize method to create a new product
    await Product.create(req.body)
    // promise resolved, respond status 200 with data if no tags, otherwise bulk create the tags and return
    .then((product) => {
      // if there's product tags, we need to 
      // create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        // loop through the tag id's and return the data
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          // return the object
          return {
            product_id: product.id, // product id
            tag_id, // tag id
          };
        });
        // pass array of objects to sequelize method 
        // bulkCreate and create multiple records at once
        ProductTag.bulkCreate(productTagIdArr);
        // return the data
        return res.status(200).json(product);
      }
      // if no product tags, return the data
      return res.status(200).json(product);
    })
    // catch errors
    .catch((err) => {
      // log the error
      console.log(err);
      // return status 500 with error message
      return res.status(500).json(err);
    });
  }
  // an error was detected 
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    return res.status(500).json(err);
  }
});

/**
 * @updateProduct
 * This route will update a product
 * name based on the ID in the params
 */
router.put('/:id', async (req, res) => {
  // error handler
  try {
    // sequelize method to update a product
    await Product.update(req.body, {
      where: { id: req.params.id }, // where id === params value
      include: [
        { model: Category }, // include the Category model
        { model: Tag }, // include the Tag model
      ]
    })
    // promise resolved, find and return product tags where product_id === params value
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    // promise resolved, delete the product tag and bulk create the new tags
    .then((productTags) => {
      // initialize variables
      const productTagIds = productTags.map(({ tag_id }) => tag_id),
            newProductTags = req.body.tags
            // filters out tags that are already in the list
            .filter((tag) => !productTagIds.includes(tag.tag_id))
            // maps remaining data for a new tags list
            .map((tag) => {
              return {
                product_id: req.params.id, // product id
                tag_id: tag.tag_id, // tag id
              };
            }),
            productTagsToRemove = productTags
            // filters out tags that need to be removed
            .filter(({ tag_id }) => !req.body.tags.map(({ tag_id }) => tag_id).includes(tag_id))
            // maps remaining data for a new tags list
            .map(({ id }) => id);

      // initialize variables
      const destroyPromise = ProductTag.destroy({ where: { id: productTagsToRemove } }), // sequelize method to delete the product tags marked for removal
            bulkCreatePromise = ProductTag.bulkCreate(newProductTags); // sequelize method to bulk create the new product tags

      // delete the tags and bulk create the new ones
      return Promise.all([destroyPromise, bulkCreatePromise]);
    })
    // promise resolved, return the updated tag list
    .then((updatedProductTags) => res.json(updatedProductTags))
    // catch errors
    .catch((err) => {
      // log the error
      console.error(err);
      if (!req.body.id) return res.status(404).json({ message: 'ID not found in the database' });
      // return status 500 with error message
      return res.status(500).json(err);
    });
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
 * @deleteProduct
 * This route will delete a product
 * based on the ID in the params
 */
router.delete('/:id', async (req, res) => {
  // initialize variables
  const productId = req.params.id;
  // error handler
  try {
    // sequelize method to delete a product 
    await Product.destroy(
      { where: { id: productId } } // where id === params value
    );
    // get the updated category data
    const products = await Product.findAll({
      include: [Category, Tag], // include all associated Category and Tag data
    });
    // return status 200 with data
    return res.status(200).json(products);
  } 
  // an error was detected 
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    return res.status(500).json(err);
  }
});

// export the routes
module.exports = router;
