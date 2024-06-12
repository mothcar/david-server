const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('./db');
const productController = require('./controllers/productController');
const couponController = require('./controllers/couponController');

const app = express();

app.use(express.static('public'))
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors());
app.use(bodyParser.json());	//요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({extended: false}));  //

app.use('/api', productController);
app.use('/api', couponController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});