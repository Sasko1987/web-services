const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  loginAttempts: Number,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

async function create(data) {
  const newUser = new Account(data);
  return await newUser.save();
}

async function getById(id) {
  return await Account.find({ _id: id });
}

async function getByEmail(email) {
  return await Account.findOne({ email });
}

async function setNewPassword(id, data) {
  return await Account.updateOne({ _id: id }, data);
}

async function getAll() {
  return await Account.find();
}

async function update(id, data) {
  return await Account.updateOne({ _id: id }, data);
}

async function remove(id) {
  return await Account.deleteOne({ _id: id });
}

module.exports = {
  create,
  getByEmail,
  getById,
  setNewPassword,
  getAll,
  update,
  remove,
};
