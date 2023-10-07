const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    latitude : {
        type: Number,
        requied: true, 
    },
    longitude : {
        type: Number,
        requied: true, 
    }
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);