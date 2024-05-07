const express = require('express');
require('./db');
const app = express();

const productController = require('./controllers/productController');

app.use('/api', productController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});