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

async function updateProduct(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ product ] } = await db.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ product ] } = await db.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return product;
  } catch (error) {
    throw error;
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
    updateProduct,
    getAllProducts
};