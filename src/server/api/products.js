productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send({
            products
        });
    } catch ({name, message}) {
        next({name, message})
    }
});