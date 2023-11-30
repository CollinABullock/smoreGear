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
  {userID: 1,
  name: "kyak",
  description: "old and used",
  price: 20,
  image_path: "https://ik.imagekit.io/7zon7c8tt/TB100NXT_FadeDeepBlueWhite_TOP.webp?updatedAt=1700151670835",
  category: "water",
  quantity: 0,
},

{
  userID: 2,
  name: "Camping Tent",
  description: "Family size. Fits up to 4 people",
  price: 300,
  image_path: "https://ik.imagekit.io/7zon7c8tt/shopping.webp?updatedAt=1700151792457",
  category: "camping",
  quantity: 0,
},
{
  userID: 3,
  name: "Bear spray",
  description: "Potent bear spray to keep them away",
  price: 50,
  image_path: "https://ik.imagekit.io/7zon7c8tt/61e485coETL._AC_UF1000,1000_QL80_.jpg?updatedAt=1700152030955",
  category: "camping",
  quantity: 0,
},
{
  userID: 4,
  name: "Trekking Poles",
  description: "Carbon fiber professional poles",
  price: 75,
  image_path: "https://ik.imagekit.io/7zon7c8tt/81AOYY-23oL.__AC_SX300_SY300_QL70_FMwebp_.webp?updatedAt=1700152105724",
  category: "hiking",
  quantity: 0,
},
{
  userID: 5,
  name: "Hiking Boots",
  description: "brand new boots ready for the outdoors",
  price: 95,

  image_path: "https://ik.imagekit.io/7zon7c8tt/61W7cLtNiLL._AC_SY625_.jpg?updatedAt=1700152181361",

  category: "hiking",
  quantity: 0,
},
{userID: 5,
  name: "NRS Slipstream Fishing Raft Package",
  description: "The NRS Slipstream 96 Raft Packages feature our smallest fishing raft. This 9'6 long Slipstream inflatable is designed specifically to fit in most standard truck beds fully inflated. It's the perfect boat for a rower and one angler looking to Catch the Adventure™ far from crowds.",
  price: 2000,

  image_path: "https://ik.imagekit.io/smoregear/SMORE%20GEAR%20SEED%20DATA/slipstream-fullraft-1024x576.jpg?updatedAt=1700685135363",

  category: "water",
  quantity: 0,
},
{userID: 5,
  name: "JB’S Jet Ski’s 2023 Sea-Doo Spark 900 Brand",
  description: "brand new 2023 sea doo spark 90 2seater or 3seater with IBR. At least 21 yrs old to drive..",
  price: 5000,

  image_path: "https://ik.imagekit.io/smoregear/SMORE%20GEAR%20SEED%20DATA/-processed.jpeg?updatedAt=1700685243587",

  category: "water",
  quantity: 0,
},
{userID: 5,
  name: "Slightly used harpoon gun",
  description: "The harpoon used for killing and catching baleen whales was (is) a formidable and heavy weapon. The harpoon itself is re-useable and consists of a long shaft that fits in the barrel that ends in four large hinged barbs. In front of the barbs is a large threaded boss onto which screws the a pointed (in this case) and explosive harpoon head. After use, the harpoon is recovered, straightened out and re-used with a new explosive head being fixed to the front. The shaft is not solid but has an open groove running it's whole length, a rope is fixed into this groove, when the harpoon is in the gun, the rope is slid to the front and here is seen hanging down ready for firing. The barbs of the harpoon are held back by wires which break when the harpoon has hit its target and the explosive charge detonates.",
  price: 500,

  image_path: "https://ik.imagekit.io/smoregear/SMORE%20GEAR%20SEED%20DATA/harpoon-gun.jpg?updatedAt=1700685462102",

  category: "water",
  quantity: 0,
},
{userID: 1,
  name: "Dolphin Skull",
  description: "The skull of a young dolphin was found in a piece of luggage, last week, according to U.S. Customs and Border Protection.  The luggage had been separated from its owner on an international flight re-entering the U.S., and was then scanned through an x-ray at the Detroit Metropolitan Airport. A skull-like shape was detected, and agents with the CBP and the U.S. Fish and Wildlife Service identified it as a dolphin upon further inspection, the CBP said.",
  price: 9,

  image_path: "https://ik.imagekit.io/smoregear/SMORE%20GEAR%20SEED%20DATA/Z2277.jpg?updatedAt=1700686326540",

  category: "water",
  quantity: 0,
},
{userID: 5,
  name: "AR 15 assault rifle",
  description: "An AR-15–style rifle is any lightweight semi-automatic rifle based on or similar to the Colt AR-15 design. The Colt model removed the selective fire feature of its predecessor, the original ArmaLite AR-15, itself a scaled-down derivative of the AR-10 design by Eugene Stoner.",
  price: 9,

  image_path: "https://ik.imagekit.io/smoregear/SMORE%20GEAR%20SEED%20DATA/GettyImages-158539059.jpg?updatedAt=1700956202795",

  category: "camping",
  quantity: 0,
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
          password VARCHAR(255) NOT NULL,
          isAdmin BOOLEAN DEFAULT FALSE
      );
      `);

    await db.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      category VARCHAR(255),
      quantity INTEGER,
      userID INTEGER NOT NULL,
      image_path VARCHAR(255)
    );
    
    CREATE INDEX products_category_index ON products(category);
    
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
        isAdmin: user.isAdmin,
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
        userID: product.userID,
        image_path: product.image_path,
        category: product.category,
        quantity: product.quantity,
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