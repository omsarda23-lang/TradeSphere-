const { model } = require("mongoose");
const { UsersSchema } = require("../schemas/UsersSchema");

const UserModel = model("user", UsersSchema);

module.exports = { UserModel };
