const db = require("./client");
const { createUser } = require("./users");
const { createProduct } = require("./products");

const users = [
  {
    userID: 1,
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    userID: 2,
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    userID: 3,
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    userID: 4,
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    userID: 5,
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
  // Add more user objects as needed
];

const products = [
  {
    userID: 1,
    name: "kyak",
    description: "old and used",
    price: 20,
    category: "water",
  },

  {
    userID: 2,
    name: "Camping Tent",
    description: "Family size. Fits up to 4 people",
    price: 300,
    category: "camping",
  },
  {
    userID: 3,
    name: "Bear spray",
    description: "Potent bear spray to keep them away",
    price: 50,
    category: "camping",
  },
  {
    userID: 4,
    name: "Trekking Poles",
    description: "Carbon fiber professional poles",
    price: 75,
    category: "hiking",
  },
  {
    userID: 5,
    name: "Hiking Boots",
    description: "brand new boots ready for the outdoors",
    price: 95,
    category: "hiking",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
    DROP TABLE IF EXISTS products;    
    DROP TABLE IF EXISTS users; 
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
      );
      `);

    await db.query(`
      CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price INTEGER NOT NULL,
          category VARCHAR(255) UNIQUE ,
          user_id INTEGER REFERENCES users(id)
          );
          `);
    console.log("Finished building tables!");
  } catch (err) {
    console.log("Error building tables!");
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        user_id: users.id,
        category: product.category,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertProducts();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();