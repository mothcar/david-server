const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('./db');
const productController = require('./controllers/productController');

const app = express();

app.use(cors());
app.use(bodyParser.json());	//요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({extended: false}));  //

app.use('/api', productController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});