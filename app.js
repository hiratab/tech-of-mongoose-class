const express = require('express');
const app = express();
require('dotenv').config();

const productRouter = require('./routes/productRouter');

app.use(express.json());
app.use('/api/v1/products', productRouter);

const server = app.listen(3000, () => {
  console.log('Server is listening at 3000');
});