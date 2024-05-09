const express = require('express');

const { getProduct } = require('../service/productService');

const productRouter = express.Router();

productRouter.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const { page, limit, sortBy, sortOrder, ...queryObj } = req.query;
  console.log('page', page, 'query', queryObj);

  const products = await getProduct({ id, page, limit, sortBy, sortOrder, queryObj });
  res.send(products);
});

module.exports = productRouter;
