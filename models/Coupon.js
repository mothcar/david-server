const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    type: { type: String, default: "TAKE" }, // GIVE, TAKE
    user_id: { type: String, default: "user id..." }, // required: true
    user_image: { type: String, default: "" },
    user_name: { type: String, default: "" },
    address_depth1: { type: String, default: "시도" },
    address_depth2: { type: String, default: "구군" },
    address_depth3: { type: String, default: "읍면동" },
    shop_id: { type: String, default: "" }, // join to shop DB
    shop_name: { type: String, default: "상호명" },
    shop_location: { type: Object, default: {} },
    title: { type: String, required: true },
    coupon_image: { type: String, default: "" },
    content: { type: String, default: "" },
    contract_place: { type: String, default: "" }, // 거래 장소명
    count: { type: Number, default: 1 },
    price: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
