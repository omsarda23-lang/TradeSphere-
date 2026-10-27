const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  available: { type: Number, default: 100000 },
  used: { type: Number, default: 0 },
  opening: { type: Number, default: 100000 },
  payin: { type: Number, default: 0 },
});

module.exports = { FundsSchema };
