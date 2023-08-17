const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
const path = require('path');
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Server"))
  .catch((err) => { console.error(`err : ${err}`) });

app.use(cors({ credentials: true, origin: true }));
// app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use("/api/checkout", stripeRoute);

// Deploy
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (res, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));
//Test
app.get("/api/test", () => {
  console.log('test is successfull ✨')
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend Server at http://localhost:${port}`);
});
// app.listen(process.env.PORT || 5000, () => {
//   console.log('Backend Server!');
// });