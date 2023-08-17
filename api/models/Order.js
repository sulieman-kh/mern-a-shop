const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    proudcts: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          // default: 1,
        },
        title: {
          type: String,
        },
        // desc: {
        //   Type: String,
        // },
        img: {
          type: String,
        },
        // color: {
        //   type: String,
        //   default: ""
        // },
        // size: {
        //   type: String,
        //   default: ""
        // },
        // price: {
        //   type: Number,
        // }
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);