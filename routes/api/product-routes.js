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
    res.json(products);
  } 
  // an error was detected
  catch (err) {
    // log the error
    console.error(err);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal Server error' });
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
    res.json(product);
  }
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal Server error' });
  }
});

/**
 * @createNewProduct
 * This route will take the data from the
 * request body, and use it to create a
 * new product. req.body expects product_name,
 * price, stock, tagId array, and category_id
 */
router.post('/', (req, res) => {
  // error handler
  try {
  // sequelize method to create a new product
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to 
      // create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        // loop through the tag id's and return the data
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        // pass array of objects to sequelize method 
        // bulkCreate and create multiple records at once
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    // promise resolved, respond status 200 with data
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // log the error
      console.log(err);
      // return status 400 with error message
      res.status(400).json(err);
    });
  }
  // an error was detected 
  catch (error) {
    // log the error
    console.error(error);
    // return status 500 with error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
