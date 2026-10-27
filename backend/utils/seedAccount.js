const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { FundsModel } = require("../model/FundsModel");
const { defaultHoldings, defaultPositions } = require("../data/seedData");

async function seedAccount(userId) {
  const existingFunds = await FundsModel.findOne({ userId });
  if (existingFunds) return;

  await FundsModel.create({
    userId,
    available: 100000,
    used: 0,
    opening: 100000,
    payin: 0,
  });

  await HoldingsModel.insertMany(
    defaultHoldings.map((item) => ({ ...item, userId }))
  );
  await PositionsModel.insertMany(
    defaultPositions.map((item) => ({ ...item, userId }))
  );
}

module.exports = { seedAccount };
