const express = require('express');
const productsRouter = express.Router();

const {
    createProduct
    getAllProducts,
    updateProduct
} = require('../db');

productsRouter.patch('/:id', async (req, res, next) => {
  try {
      const updatedProduct = await updateProduct(req.params.id, req.body);
      res.send(updatedProduct)
  } catch (error) {
      console.log(error);
  }
});

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


productsRouter.post('/', async(req, res, next) => {
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
module.exports = productsRouter;

