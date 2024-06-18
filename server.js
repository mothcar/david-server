const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');
const http = require('http')
const https = require('https');
const app = express();

require('./db');
const productController = require('./controllers/productController');
const couponController = require('./controllers/couponController');



app.use(express.static('public'))
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors());
app.use(bodyParser.json());	//요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({extended: false}));  //

app.use('/api', productController);
app.use('/api', couponController);

const HOST = "localhost"
const PORT = process.env.PORT || 3000;
const USE_SSL = false
global.TEST = "This is Global Test.................."

if(USE_SSL){
  // init SSL
  let options = {
    // key:  fs.readFileSync(path.join(__dirname, 'cert', SSL.KEY)),
    // cert: fs.readFileSync(path.join(__dirname, 'cert', SSL.CERT)),
    key: fs.readFileSync("./config/cert.key"),
    cert: fs.readFileSync("./config/cert.crt"),
    //   cert: fs.readFileSync('/etc/letsencrypt/live/coupon-egg.netlify.app//fullchain.pem'),
    //   key: fs.readFileSync('/etc/letsencrypt/live/coupon-egg.netlify.app//privkey.pem')
  }
  https.createServer(options, app).listen(PORT, ()=>{
    console.log(`init REST: https://${HOST}:${PORT}`)
  })
}
else{
  http.createServer(app).listen(PORT, ()=>{
    console.log(`init REST: http://${HOST}:${PORT}`)
  })
}

// ***************** Simple http protocol *************************
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

console.log('Console log : ', TEST)