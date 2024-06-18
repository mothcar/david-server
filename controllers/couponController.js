const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
      cb(null, 'Images/')
  },
  filename: (req, file, cb)=> {
      cb(null, Date.now() + "_" + file.originalname)
  }
})

const uploadMiddleWare = multer({ storage: storage }).single('file');

const path = require('path');

//Upload Image controller

const imgconfig = multer.diskStorage({
    destination:(req, file,callback)=>{
        callback(null,'uploads')
    },
    filename:(req, file, callback)=>{
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})
const upload = multer({
    
  storage: imgconfig,
  limits:{fileSize:'1000000'},
  fileFilter:(req, file, callback)=>{
      const fileType = /jpeg|jpg|png|gif|webp/
      const mimeType = fileType.test(file.mimetype)
      const extname = fileType.test(path.extname(file.originalname))
      if(mimeType && extname){
          return callback(null, true)
      }
      callback('Give proper file format to upload')
  }
}).single('file')

// Get all Coupon
router.post('/saveCoupon', upload, async (req, res) => {
  try {
    console.log('req.body : ', req.body)
    const url = req.protocol + '://'+ req.get("host")+"/"+req.file.path;
    console.log('Image Url : ', url )
    // uploadMiddleWare(req, res, (err) => {
    //   console.log("Middle : ", req.file)
    //   if (err) {
    //     res.sendStatus(500);
    //   }
    //   res.send(req.file);
    // });

    /* get from user
    user_image
    user_name

    shop_id
    coupon_image
    */ 
   
    const params = {
      type: req.body.type,  // GIVE, TAKE
      user_id: req.body.userId,  
      user_name: "테스트",
      address_depth1: "서울",
      address_depth2: "동작구",
      address_depth3: "신대방동",
      shop_name: "게게명",
      shop_location:{},
      title: req.body.title,
      coupon_image: url,
      content: "",
      price: 500
    }

    const coupon = await Coupon.create(params);
    if(coupon) return res.json({item: coupon});
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/coupons', async (req, res) => {
  try {
    // console.log('Get coupon.....')
    const coupons = await Coupon.find();
    res.json({item: coupons});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single coupon by ID
router.get('/coupon/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: 'coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;