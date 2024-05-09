const mongoose = require("mongoose");
const Product = require('../models/ProductModel');

const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

const getProduct = async ({
  id,
  page,
  limit,
  sortBy, 
  sortOrder,
  queryObj,
}) => {
  console.log(' getProduct sortBy', sortBy, 'sortOrder', sortOrder);
  try {
    const conn = await mongoose.connect(CONNECTION_URI);
    console.log(`Mongoose connected to: ${conn.connection.host}`);

    Object.keys(queryObj).forEach(key => queryObj[key] = JSON.parse(queryObj[key]));
    console.log(queryObj);
    const queryObjString = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);
    queryObj = JSON.parse(queryObjString);
    console.log('queryObj', queryObj);
    if (id) {
      query['_id'] = id
    };

    const paginationParameters = {
      skip: Number(page) * limit,
      limit,
    };

    const sortObject = {};
    sortObject[sortBy] = sortOrder;
    return await Product
      .find(queryObj, {}, paginationParameters)
      .sort(sortObject);
  } finally {
    await mongoose.connection.close();
  }
}

module.exports = {
  getProduct
}
