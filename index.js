require('dotenv').config();
const mongoose = require('mongoose');

const Product = require('./models/ProductModel');

const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

const createProductSave = async () => {
  const product = new Product({
    title: "Product Title",
    description: "Product Description",
    price: 123,
    created: new Date(),
  });
  await product.save();
  console.log(product);
}

const createProductCreate = async () => {
  const productCreate = await Product.create({
    title: "Title",
    description: "Description",
    price: 321,
    created: new Date(),
  });
  console.log(productCreate);
}

const createProductMany = async () => {
  await Product.insertMany([
    {
      title: "Title1",
      description: "Description1",
      price: 457,
      created: new Date(),
    }, 
    {
      title: "Title2",
      description: "Description2",
      price: 765,
      created: new Date(),
    }
  ])
}

const findProduct = async () => {
  return await Product.find({
    price: {
      $gte: 450
    },
    title: 'Title1'
  });
}

async function run() {
  try {
    const conn = await mongoose.connect(CONNECTION_URI);
    console.log(`Mongoose connected to: ${conn.connection.host}`);

    const products = await findProduct();
    console.log(products);
  } finally {
    await mongoose.connection.close();
  }
}
run().catch(console.dir);