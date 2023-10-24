const express = require('express')
const productsRouter = express.Router();

const {
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

const jwt = require('jsonwebtoken')