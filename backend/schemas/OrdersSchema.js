const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    name: String,
    qty: Number,
    price: Number,
    mode: { type: String, enum: ["BUY", "SELL"] },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };
