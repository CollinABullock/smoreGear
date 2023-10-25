const express = require('express');
const productsRouter = express.Router();

const {
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

module.exports = productsRouter;
