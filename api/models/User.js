const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    lastname: { type: String, required: true, unique: true },
    firstname: { type: String, required: true, unique: true },
    surname: { type: String, required: false, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);