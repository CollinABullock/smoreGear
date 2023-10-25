const express = require('express');
const productsRouter = express.Router();

const {
    getAllProducts
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

module.exports = productsRouter;
