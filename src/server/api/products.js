const express = require('express');
const productsRouter = express.Router();
// const { requireUser } = require(‘./utils');


const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProductsById,
    getProductById,
    getProductsByCategory,
    getProductsByUserID
} = require('../db');

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();
      console.log("products", products);
        res.send({
            products
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

productsRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        res.send(updatedProduct)
    } catch (error) {
        console.log(error);
    }
  });


productsRouter.post('/post', async(req, res, next) => {
   const {name, description, price, category, userID} = req.body;

   const postProducts = {};

   try {
    postProducts.name = name;
    postProducts.description = description;
    postProducts.price = price;
    postProducts.category = category;
    postProducts.userID = userID;

    const products = await createProduct(postProducts)

    if (products) {
        res.send(products);
    } else {
        next({
            name: `ProductCreationError`,
            message: `There was an error creating your product. Please try again.`
        })
    }

    } catch ({name, message}){
        next({name, message});
    }
})

productsRouter.get('/:id', async (req, res, next) => {
  try {
      const products = await getProductById(req.params.id);
      res.send(products);
  } catch (error) {
      next(error);
  }
});

// Example usage in your routes or controller
productsRouter.get('/category/:category', async (req, res, next) => {
    try {
      const category = req.params.category;
      const products = await getProductsByCategory(category);
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

  productsRouter.get('/userid/:userid', async (req, res, next) => {
    try {
      const userid = req.params.userid;
      const products = await getProductsByUserID(userid);
      res.send(products);
    } catch (error) {
      next(error);
    }
  });
  


  // requireUser needs to be added after /:id and before the async function
productsRouter.delete('/:id', async (req, res, next) => {
    try {
        const products = await deleteProductsById(req.params.id, req.body);
        res.send(products);
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;

