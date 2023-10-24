const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createProduct = async({ name, description, price }) => {
    try {
        const { rows: [product ] } = await db.query(`
        INSERT INTO products(name, description, price)
        VALUES($1, $2, $3)
        RETURNING *`, [name, description, price]);

        return product;
    } catch (err) {
        throw err;
    }
}

async function getAllProducts() {
    try {
      const { rows } = await db.query(`
        SELECT id, name, description, price 
        FROM products;
      `);
    
      return rows;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    createProduct,
    getAllProducts
};