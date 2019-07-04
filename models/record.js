const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    require: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Record", recordSchema);
