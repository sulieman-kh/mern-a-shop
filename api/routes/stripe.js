const router = require("express").Router();
require('dotenv').config();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

// console.log(KEY)

router.post("/payment", (req, res) => {
  // console.log(req)
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "rub",
    }, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr)
      } else {
        res.status(200).json(stripeRes);
      };
    },
  )
});
module.exports = router;