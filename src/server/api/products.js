const express = require('express');
const productsRouter = express.Router();
// const { requireUser } = require(‘./utils');


const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProductsById,
    getProductById
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
   const {name, description, price = ""} = req.body;

   const postProducts = {};

   try {
    postProducts.name = name;
    postProducts.description = description;
    postProducts.price = price;

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

productsRouter.get('/:category', async (req, res, next) => {
    try {
        const products = await getProductByCategory(req.params.category);
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

